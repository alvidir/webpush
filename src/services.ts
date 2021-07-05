import {sendUnaryData, ServerUnaryCall} from "grpc";
import express from "express";
import webpush from "./webpush";
import { INotifierServer } from "./proto/notifier_grpc_pb";
import {PushRequest, PushResponse} from "./proto/notifier_pb"

interface SubscriptionsRepository {
    InsertSubscription: (data: any) => Promise<string>;
    FindSubscription: (id: string) => Promise<any>;
    DeleteSubscription: (id: string) => void;
}

interface NotificationsRepository {
    InsertNotification: (data: any) => Promise<string>;
}

class Notifier implements INotifierServer {
    private subRepo: SubscriptionsRepository;
    private notRepo: NotificationsRepository;

    constructor(subRepo: SubscriptionsRepository, notRepo: NotificationsRepository) {
        this.subRepo = subRepo;
        this.notRepo = notRepo;
    }

    push = async (call: ServerUnaryCall<PushRequest>, callback: sendUnaryData<PushResponse>) => {
        const id = call.request.getSubscriber();
        const subscription = await this.subRepo.FindSubscription(id);
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

        const result = await this.notRepo.InsertNotification(notif)
        
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

class Subscriber {
    private subRepo: SubscriptionsRepository;

    constructor(subRepo: SubscriptionsRepository) {
        this.subRepo = subRepo;
    }

    subscribe = async (req: express.Request, res: express.Response) => {
        let subscription = req.body;
        console.log(subscription);
        
        let result = await this.subRepo.InsertSubscription(subscription);
        res.status(201).json({id: result});
    }
    
    unsubscribe = async (req: express.Request, res: express.Response) => {
        const subscription = req.params.tagId;
        await this.subRepo.DeleteSubscription(subscription);
        res.status(204).json();
    }

    listNotifications = (req: express.Request, res: express.Response) => {
        res.status(200).json();
    }
    
    publicVapidKey = (req: express.Request, res: express.Response) => {
        res.status(200).json({
            PUBLIC_VAPID_KEY: process.env.PUBLIC_VAPID_KEY?? ""
        });
    }
}

export {
    Notifier,
    Subscriber
};