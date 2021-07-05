import { MongoClient, ObjectID } from "mongodb";

const uri = process.env.MONGO_URI?? "";

const Database = {
    InsertSubscription: async (data: any): Promise<string> => {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        await client.connect();
    
        const db = client.db("webpush");
        const result = await db.collection("subscriptions")
                                .insertOne(data);
    
        await client.close();
        return result.insertedId;
        
    },
    
    FindSubscription: async (id: string): Promise<any> => {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        await client.connect();
    
        
        const db = client.db("webpush");
        const cursor = db.collection("subscriptions")
                         .find({ _id: new ObjectID(id) });
    
        let result: any | undefined = undefined;
        if (await cursor.count()) {
            result = await cursor.next();
        }
    
        await cursor.close();
        await client.close();
        return result;
    },
    
    DeleteSubscription: async (id: string) => {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        await client.connect();
    
        const db = client.db("webpush");
        const result = await db.collection("subscriptions")
                            .deleteOne({ id: id });
    
        await client.close();
    },
    
    InsertNotification: async (data: any): Promise<string> => {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        
        await client.connect();
    
        const db = client.db("webpush");
        const result = await db.collection("notifications")
                            .insertOne(data);
    
        await client.close();
        return result.insertedId;
    }
}

export {
    Database
};