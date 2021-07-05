import dotenv from "dotenv";
dotenv.config(); // init environment variables from .env file

import grpc from "grpc";
import {Notifier} from "./services";
import {NotifierService} from "./proto/notifier_grpc_pb";
import { Database as db } from "./database";

const server = new grpc.Server({
    'grpc.max_receive_message_length': -1,
    'grpc.max_send_message_length': -1,
});

server.addService(NotifierService, new Notifier(db, db));

const addr = `localhost:${process.env.SERVER_PORT}`;
server.bind(addr, grpc.ServerCredentials.createInsecure());

console.log(`server listening on port ${process.env.SERVER_PORT}`);
server.start();