import dotenv from "dotenv";
dotenv.config(); // init environment variables from .env file

import {Notifier} from "./services";
import { Database as db } from "./database";

// gRPC setup - Native JS
const PROTO_PATH = __dirname + "/proto/notifier.proto";
const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

var packageDefinition = protoLoader.loadSync(
    PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);
const proto = protoDescriptor.proto;

// Server setup
const server = new grpc.Server({
    "grpc.max_receive_message_length": -1,
    "grpc.max_send_message_length": -1,
});

const impl = new Notifier(db, db).impl;
server.addService(proto.Notifier.service, impl);

const addr = `localhost:${process.env.SERVER_PORT}`;
server.bindAsync(addr, grpc.ServerCredentials.createInsecure(), () => {
    console.log(`server listening on port ${process.env.SERVER_PORT}`);
    server.start();
});