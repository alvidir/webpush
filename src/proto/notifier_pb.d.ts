// package: proto
// file: proto/notifier.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Metadata extends jspb.Message { 
    getOrigin(): string;
    setOrigin(value: string): Metadata;

    getCreatedAt(): number;
    setCreatedAt(value: number): Metadata;

    getUrgency(): Urgency;
    setUrgency(value: Urgency): Metadata;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Metadata.AsObject;
    static toObject(includeInstance: boolean, msg: Metadata): Metadata.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Metadata, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Metadata;
    static deserializeBinaryFromReader(message: Metadata, reader: jspb.BinaryReader): Metadata;
}

export namespace Metadata {
    export type AsObject = {
        origin: string,
        createdAt: number,
        urgency: Urgency,
    }
}

export class Notification extends jspb.Message { 
    getTitle(): string;
    setTitle(value: string): Notification;

    getBody(): string;
    setBody(value: string): Notification;

    getUrl(): string;
    setUrl(value: string): Notification;

    getIconUrl(): string;
    setIconUrl(value: string): Notification;


    hasMeta(): boolean;
    clearMeta(): void;
    getMeta(): Metadata | undefined;
    setMeta(value?: Metadata): Notification;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Notification.AsObject;
    static toObject(includeInstance: boolean, msg: Notification): Notification.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Notification, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Notification;
    static deserializeBinaryFromReader(message: Notification, reader: jspb.BinaryReader): Notification;
}

export namespace Notification {
    export type AsObject = {
        title: string,
        body: string,
        url: string,
        iconUrl: string,
        meta?: Metadata.AsObject,
    }
}

export class PushRequest extends jspb.Message { 
    getSubscriber(): string;
    setSubscriber(value: string): PushRequest;


    hasData(): boolean;
    clearData(): void;
    getData(): Notification | undefined;
    setData(value?: Notification): PushRequest;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PushRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PushRequest): PushRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PushRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PushRequest;
    static deserializeBinaryFromReader(message: PushRequest, reader: jspb.BinaryReader): PushRequest;
}

export namespace PushRequest {
    export type AsObject = {
        subscriber: string,
        data?: Notification.AsObject,
    }
}

export class PushResponse extends jspb.Message { 
    getNotificationId(): string;
    setNotificationId(value: string): PushResponse;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PushResponse.AsObject;
    static toObject(includeInstance: boolean, msg: PushResponse): PushResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PushResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PushResponse;
    static deserializeBinaryFromReader(message: PushResponse, reader: jspb.BinaryReader): PushResponse;
}

export namespace PushResponse {
    export type AsObject = {
        notificationId: string,
    }
}

export enum Urgency {
    LOW = 0,
    NORMAL = 1,
    HIGH = 2,
    CRITICAL = 3,
}
