import {sendUnaryData, ServerUnaryCall} from "grpc";
import express from "express";
import webpush from "./webpush";
import {FindSubscription, InsertNotification, InsertSubscription, DeleteSubscription} from "./database";
import { INotifierServer } from "./proto/notifier_grpc_pb";
import {PushRequest, PushResponse} from "./proto/notifier_pb"

const Notifier: INotifierServer = {
    push: async (call: ServerUnaryCall<PushRequest>, callback: sendUnaryData<PushResponse>) => {
        const id = call.request.getSubscriber();
        const subscription = await FindSubscription(id);
        if (!subscription) {
            const err = new Error("subscription not found");
            callback(err, null);
            return
        }

        const notif = call.request.getData();
        if (!notif) {
            const err = new Error("something went wrong");
            callback(err, null);
            return
        }

        const result = await InsertNotification(notif)
        
        let resp = new PushResponse();
        resp.setNotificationId(result);

        const payload = JSON.stringify({
            title: notif.getTitle(),
            body: notif.getBody(),
            url: notif.getUrl(),
        });
    
        webpush.sendNotification(subscription, payload);
        callback(null, resp);
    }
}

const Subscriber = {
    subscribe: async (req: express.Request, res: express.Response) => {
        let subscription = req.body;
        console.log(subscription);
        
        let result = await InsertSubscription(subscription);
        res.status(201).json({id: result});
    },
    
    unsubscribe: async (req: express.Request, res: express.Response) => {
        const subscription = req.params.tagId;
        await DeleteSubscription(subscription);
        res.status(204).json();
    },
    
    listNotifications: (req: express.Request, res: express.Response) => {
        res.status(200).json();
    },
    
    publicVapidKey: (req: express.Request, res: express.Response) => {
        res.status(200).json({
            PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY?? ""
        });
    }
    
}

export {
    Notifier,
    Subscriber
};