import dotenv from "dotenv";
dotenv.config(); // init environment variables from .env file

import express from "express";
import path from "path";
import router from "./routes"

const app = express();
app.use(express.json()); // unmarshal json body
app.use(router); // service routes

// Static contents
const staticPath = path.join(__dirname, 'public'); 
app.use(express.static(staticPath));

// Run server
app.listen(process.env.SERVER_ADDR);
console.log(`Server listening on port ${process.env.SERVER_ADDR}`);