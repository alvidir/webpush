import {InsertSubscription, DeleteSubscription} from "./database";

const subscribe = async (req: any, res: any) => {
    let subscription = req.body;
    console.log(subscription);
    
    let result = await InsertSubscription(subscription);
    res.status(201).json({id: result});
}

const unsubscribe = async (req: any, res: any) => {
    const subscription = req.params.tagId;
    await DeleteSubscription(subscription);
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

export {
    subscribe,
    unsubscribe,
    listNotifications,
    publicVapidKey
}