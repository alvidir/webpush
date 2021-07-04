import {sendUnaryData, ServerUnaryCall} from "grpc";
import webpush from "./webpush";
import {FindSubscription, InsertNotification} from "./database";
import { NotifierService, INotifierServer } from "./proto/notifier_grpc_pb";
import {PushRequest, PushResponse} from "./proto/notifier_pb"

const Notifier: INotifierServer = {
    push: async (call: ServerUnaryCall<PushRequest>, callback: sendUnaryData<PushResponse>) => {
        const id = call.request.getUserId();
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

export {
    Notifier,
    NotifierService
};