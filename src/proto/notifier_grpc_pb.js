// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var proto_notifier_pb = require('../proto/notifier_pb.js');

function serialize_proto_PushRequest(arg) {
  if (!(arg instanceof proto_notifier_pb.PushRequest)) {
    throw new Error('Expected argument of type proto.PushRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_PushRequest(buffer_arg) {
  return proto_notifier_pb.PushRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_proto_PushResponse(arg) {
  if (!(arg instanceof proto_notifier_pb.PushResponse)) {
    throw new Error('Expected argument of type proto.PushResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_proto_PushResponse(buffer_arg) {
  return proto_notifier_pb.PushResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var NotifierService = exports.NotifierService = {
  push: {
    path: '/proto.Notifier/Push',
    requestStream: false,
    responseStream: false,
    requestType: proto_notifier_pb.PushRequest,
    responseType: proto_notifier_pb.PushResponse,
    requestSerialize: serialize_proto_PushRequest,
    requestDeserialize: deserialize_proto_PushRequest,
    responseSerialize: serialize_proto_PushResponse,
    responseDeserialize: deserialize_proto_PushResponse,
  },
};

exports.NotifierClient = grpc.makeGenericClientConstructor(NotifierService);
