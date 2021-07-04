import dotenv from "dotenv";
dotenv.config(); // init environment variables from .env file

import express from "express";
import {Router} from "express";
import path from "path";
import {subscribe, unsubscribe, listNotifications, publicVapidKey} from "./service";

let router = Router();
router.post("/subscribe", subscribe);
router.delete("/u/:id", unsubscribe);
router.get("/u/:id/notifications", listNotifications);
router.get("/key", publicVapidKey);


const app = express();
app.use(express.json()); // unmarshal json body
app.use(router); // register service routes
const staticPath = path.join(__dirname, 'public'); 
app.use(express.static(staticPath)); // Static contents

// Run server
app.listen(process.env.SERVER_ADDR);
console.log(`Server listening on port ${process.env.SERVER_ADDR}`);