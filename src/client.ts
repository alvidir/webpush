import dotenv from "dotenv";
dotenv.config(); // init environment variables from .env file

import grpc from "grpc";
import { PushRequest, PushResponse, Notification, Metadata } from "./proto/notifier_pb";
import { NotifierClient } from "./proto/notifier_grpc_pb";

const addr = `localhost:${process.env.SERVER_PORT}`;
var client = new NotifierClient(addr, grpc.credentials.createInsecure());

const meta: Metadata = new Metadata()
                            .setOrigin("localhost")
                            .setCreatedAt(0)
                            .setUrgency(0);


const notif: Notification = new Notification()
                                .setTitle("Hello world")
                                .setBody("This notification comes from nowhere")
                                .setUrl("github.com/alvidir")
                                .setIconUrl("none")
                                .setMeta(meta);

const subscription_id = process.env.SUBSCRIPTION_ID?? "";
const request: PushRequest = new PushRequest()
                                .setSubscriptionId(subscription_id)
                                .setData(notif);

client.push(request, function(err: grpc.ServiceError | null, response: PushResponse) {
    if (err) {
        console.log('Server error', err);
    } else {
        console.log('Server:', response.getNotificationId());
    }
});