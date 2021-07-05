import dotenv from "dotenv";
dotenv.config(); // init environment variables from .env file

import path from "path";
import express, {Router} from "express";
import cors from "cors";
import {Subscriber} from "./services";
import {Database as db} from "./database";

const server = new Subscriber(db) ;

let router = Router();
router.post("/subscribe", server.subscribe);
router.delete("/u/:id", server.unsubscribe);
router.get("/u/:id/notifications", server.listNotifications);
router.get("/key", server.publicVapidKey);

const app = express();
app.use(cors()); // enable CORS for all origins
app.use(express.json()); // unmarshal json body
app.use(router); // register service routes
const staticPath = path.join(__dirname, 'public'); 
app.use(express.static(staticPath)); // Static contents

// Run server
app.listen(process.env.SERVER_PORT);
console.log(`server listening on port ${process.env.SERVER_PORT}`);