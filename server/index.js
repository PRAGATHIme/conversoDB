import express from 'express';
import { NlpManager } from "node-nlp"; 
import cors from 'cors';
const app = express();


import dotenv from 'dotenv';
dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT
//add here



const manager = new NlpManager({ languages: ["en"] });

// Train the NLP model with intents and responses
const trainNLPModel = async () => {
  try {
    manager.addDocument("en", "display bills", "get.bills");
    manager.addDocument("en", "show me bills", "get.bills");
    manager.addDocument("en", "add item", "add.item");
    manager.addDocument("en", "get user details", "get.user");
    manager.addDocument("en", "update item", "update.item");
    manager.addDocument("en", "delete item", "delete.item");
    manager.addDocument("en", "search item", "search.item");

    manager.addAnswer("en", "get.bills", "Here are your latest bills: Bill A, Bill B.");
    manager.addAnswer("en", "add.item", "Please provide the details of the item to add.");
    manager.addAnswer("en", "get.user", "Here are your details: Name: John Doe, Account: #123456.");
    manager.addAnswer("en", "update.item", "Please provide the item details you'd like to update.");
    manager.addAnswer("en", "delete.item", "Please specify the item you'd like to delete.");
    manager.addAnswer("en", "search.item", "What item are you searching for?");

    await manager.train();
    manager.save();
  } catch (error) {
    console.error("Error training NLP model:", error);
  }
};

// Train the NLP model on startup
trainNLPModel();

// Handle incoming chat requests
app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    // Process the user's message
    const response = await manager.process("en", userMessage);

    // Send the response back to the frontend
    res.json({ message: response.answer });
  } catch (error) {
    console.error("Error processing user message:", error);
    res.status(500).json({ message: "Sorry, I couldn't process that request." });
  }
});



// remove here
app.listen(PORT, ()=>{
    console.log("app is listening");
});