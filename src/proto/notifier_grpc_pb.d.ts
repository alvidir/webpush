// package: proto
// file: proto/notifier.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "grpc";
import * as proto_notifier_pb from "../proto/notifier_pb";

interface INotifierService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    push: INotifierService_IPush;
}

interface INotifierService_IPush extends grpc.MethodDefinition<proto_notifier_pb.PushRequest, proto_notifier_pb.PushResponse> {
    path: "/proto.Notifier/Push";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<proto_notifier_pb.PushRequest>;
    requestDeserialize: grpc.deserialize<proto_notifier_pb.PushRequest>;
    responseSerialize: grpc.serialize<proto_notifier_pb.PushResponse>;
    responseDeserialize: grpc.deserialize<proto_notifier_pb.PushResponse>;
}

export const NotifierService: INotifierService;

export interface INotifierServer {
    push: grpc.handleUnaryCall<proto_notifier_pb.PushRequest, proto_notifier_pb.PushResponse>;
}

export interface INotifierClient {
    push(request: proto_notifier_pb.PushRequest, callback: (error: grpc.ServiceError | null, response: proto_notifier_pb.PushResponse) => void): grpc.ClientUnaryCall;
    push(request: proto_notifier_pb.PushRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notifier_pb.PushResponse) => void): grpc.ClientUnaryCall;
    push(request: proto_notifier_pb.PushRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notifier_pb.PushResponse) => void): grpc.ClientUnaryCall;
}

export class NotifierClient extends grpc.Client implements INotifierClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public push(request: proto_notifier_pb.PushRequest, callback: (error: grpc.ServiceError | null, response: proto_notifier_pb.PushResponse) => void): grpc.ClientUnaryCall;
    public push(request: proto_notifier_pb.PushRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: proto_notifier_pb.PushResponse) => void): grpc.ClientUnaryCall;
    public push(request: proto_notifier_pb.PushRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: proto_notifier_pb.PushResponse) => void): grpc.ClientUnaryCall;
}
