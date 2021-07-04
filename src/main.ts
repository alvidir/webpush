import dotenv from "dotenv";
dotenv.config(); // init environment variables from .env file

import grpc from "grpc";
import {Notifier, NotifierService} from "./service";

const server = new grpc.Server({
    'grpc.max_receive_message_length': -1,
    'grpc.max_send_message_length': -1,
});

server.addService(NotifierService, Notifier);

const addr = process.env.SERVER_ADDR?? "localhost:8080";
server.bind(addr, grpc.ServerCredentials.createInsecure());

console.log(`Server listening on port ${process.env.SERVER_ADDR}`);
server.start();