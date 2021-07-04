import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI?? "";

const InsertSubscription = async (subscription: any): Promise<string> => {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    await client.connect();

    const db = client.db("webpush");
    const result = await db.collection("subscriptions")
                            .insertOne(subscription);

    await client.close();
    return result.insertedId;
    
}

const DeleteSubscription = async (id: string) => {
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    
    await client.connect();

    const db = client.db("webpush");
    const result = await db.collection("subscriptions")
                        .deleteOne({ id: id });

    await client.close();
}

export {
    InsertSubscription,
    DeleteSubscription
};