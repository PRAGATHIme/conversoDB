import express from 'express';
import { NlpManager } from "node-nlp"; 
import cors from 'cors';

import mysql from "mysql2/promise";

const app = express();


import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT

const db = await mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});
//add here



const manager = new NlpManager({ languages: ["en"] });

// Train the NLP model with intents and responses
const trainNLPModel = async () => {
  // Add intents and answers
  manager.addDocument("en", "display bills", "get.bills");
  manager.addDocument("en", "show me bills", "get.bills");
  manager.addDocument("en", "add item", "add.item");
  manager.addDocument("en", "get user details", "get.user");
  manager.addDocument("en", "update item", "update.item");
  manager.addDocument("en", "delete item", "delete.item");
  manager.addDocument("en", "search item", "search.item");

  manager.addAnswer("en", "get.bills", "Fetching your latest bills...");
  manager.addAnswer("en", "add.item", "Please provide the details of the item to add.");
  manager.addAnswer("en", "get.user", "Fetching your details...");
  manager.addAnswer("en", "update.item", "Updating the specified item...");
  manager.addAnswer("en", "delete.item", "Deleting the specified item...");
  manager.addAnswer("en", "search.item", "Searching for the item...");

  await manager.train();
  manager.save();
};

await trainNLPModel();

// Chat endpoint
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  const response = await manager.process("en", userMessage);

  let botMessage = response.answer;

  try {
    // Handle SQL-based intents
    if (response.intent === "get.bills") {
      const [rows] = await db.query("SELECT * FROM bills LIMIT 10");
      botMessage = `Here are your latest bills:\n${rows
        .map((row) => `Bill ID: ${row.id}, Amount: ${row.amount}`)
        .join("\n")}`;
    } else if (response.intent === "add.item") {
      botMessage = "Please use the format: Add Item [name], [price]";
    } else if (response.intent === "get.user") {
      const [rows] = await db.query("SELECT * FROM users WHERE id = 1"); // Example query
      botMessage = rows.length
        ? `User Details:\nName: ${rows[0].name}, Email: ${rows[0].email}`
        : "No user details found.";
    } else if (response.intent === "update.item") {
      botMessage = "Please use the format: Update Item [item_id], [new_name], [new_price]";
    } else if (response.intent === "delete.item") {
      botMessage = "Please use the format: Delete Item [item_id]";
    } else if (response.intent === "search.item") {
      botMessage = "Please specify the item name to search for.";
    }
  } catch (error) {
    console.error("Error interacting with database:", error);
    botMessage = "Sorry, I encountered an error while interacting with the database.";
  }

  res.json({ message: botMessage });
});



// remove here
app.listen(PORT, ()=>{
    console.log("app is listening");
});