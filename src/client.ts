import grpc from "grpc";
import { PushRequest, PushResponse, Notification, Metadata } from "./proto/notifier_pb";
import { NotifierClient } from "./proto/notifier_grpc_pb";

const addr = process.env.SERVER_ADDR?? "localhost:8080";
var client = new NotifierClient(addr, grpc.credentials.createInsecure());;

const notif: Notification = new Notification()
                                .setTitle("Hello world")
                                .setBody("This notification comes from nowhere");

const request: PushRequest = new PushRequest()
                                .setSubscriber("<subscriber_id>")
                                .setData(notif);

client.push(request, function(err: grpc.ServiceError | null, response: PushResponse) {
    if (err) {
        console.log('Server error', err);
    } else {
        console.log('Server:', response.getNotificationId());
    }
});