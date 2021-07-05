import dotenv from "dotenv";
dotenv.config(); // init environment variables from .env file

import path from "path";
import express, {Router} from "express";
import cors from "cors";
import {Subscriber} from "./services";

let router = Router();
router.post("/subscribe", Subscriber.subscribe);
router.delete("/u/:id", Subscriber.unsubscribe);
router.get("/u/:id/notifications", Subscriber.listNotifications);
router.get("/key", Subscriber.publicVapidKey);

const app = express();
app.use(cors()); // enable CORS for all origins
app.use(express.json()); // unmarshal json body
app.use(router); // register service routes
const staticPath = path.join(__dirname, 'public'); 
app.use(express.static(staticPath)); // Static contents

// Run server
app.listen(process.env.SERVER_PORT);
console.log(`server listening on port ${process.env.SERVER_PORT}`);