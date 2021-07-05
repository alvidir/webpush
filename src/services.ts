import {sendUnaryData, ServerUnaryCall} from "@grpc/grpc-js";
import express from "express";
import webpush from "./webpush";

import {PushRequest} from "./proto/PushRequest";
import {PushResponse} from "./proto/PushResponse";
import {NotifierHandlers} from "./proto/Notifier";

interface SubscriptionsRepository {
    InsertSubscription: (data: any) => Promise<string>;
    FindSubscription: (id: string) => Promise<any>;
    DeleteSubscription: (id: string) => void;
}

interface NotificationsRepository {
    InsertNotification: (data: any) => Promise<string>;
}

class Notifier {
    private subRepo: SubscriptionsRepository;
    private notRepo: NotificationsRepository;
    public impl: NotifierHandlers = {
        Push: async (call: ServerUnaryCall<PushRequest, PushResponse>, callback: sendUnaryData<PushResponse>) => {
            if (!call.request.subscriber) {
                const err = new Error("subscriber is required");
                callback(err, null);
                return
            }

            const id = call.request.subscriber;
            const subscription = await this.subRepo.FindSubscription(id);
            if (!subscription) {
                const err = new Error("subscription not found");
                callback(err, null);
                return
            }
    
            
            if (!call.request.data) {
                const err = new Error("something went wrong");
                callback(err, null);
                return
            }
            
            const data = call.request.data;
            // const notification = {
            //     title: data.title,
            //     body: data.body,
            //     url: data.url,
            //     icon_url: data.icon_url,
            //     meta: {
            //         origin: data.meta?.origin,
            //         created_at: data.meta?.created_at,
            //         urgency: data.meta?.urgency,
            //     }
            // };
    
            const result = await this.notRepo.InsertNotification(data);
            callback(null, {
                notification_id: result,
            });
    
            const payload = JSON.stringify(data);
            webpush.sendNotification(subscription, payload);
        }
    }

    constructor(subRepo: SubscriptionsRepository, notRepo: NotificationsRepository) {
        this.subRepo = subRepo;
        this.notRepo = notRepo;
    }
}

class Subscriber {
    private subRepo: SubscriptionsRepository;

    constructor(subRepo: SubscriptionsRepository) {
        this.subRepo = subRepo;
    }

    subscribe = async (req: express.Request, res: express.Response) => {
        let subscription = req.body;
        
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