import webpush from "../webpush";
import {Router} from "express";
const router = Router();

let subscription;
const subscribe = async (req: any, res: any) => {
    subscription = req.body;
    console.log(subscription);
    res.status(201).json();

    const payload = JSON.stringify({
        title: "Hello world",
        body: "this is a notification"
    });

    await webpush.sendNotification(subscription, payload);
}

const unsubscribe = (req: any, res: any) => {
    res.status(204).json();
}

const listNotifications = (req: any, res: any) => {
    res.status(200).json();
}

const publicVapidKey = (req: any, res: any) => {
    res.status(200).json({
        PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY?? ""
    });
}

router.post("/subscribe", subscribe);
router.delete("/u/{ID:[a-zA-Z0-9_]+}", unsubscribe);
router.get("/u/{ID:[a-zA-Z0-9_]+}/notifications", listNotifications);
router.get("/vapid", publicVapidKey);

export default router;