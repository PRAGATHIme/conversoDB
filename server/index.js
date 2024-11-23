import express from 'express';
import cors from 'cors';

import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT
//add here













// remove here
const app = express();
app.use(cors());

app.listen(PORT, ()=>{
    console.log("app is listening");
});