import {
    MongoClient,
    Collection,
    ObjectId,
    OptionalUnlessRequiredId,
    Filter,
    WithId,
    Document,
} from "mongodb";

export class DynamicCollection<T extends Document> {
    private collection!: Collection<T>;
    private client!: MongoClient;

    private constructor() {}

    static async create<T extends Document>(
        collectionName: string,
        url: string,
        dbName: string
    ): Promise<DynamicCollection<T>> {
        const instance = new DynamicCollection<T>();
        await instance.initialize(collectionName, url, dbName);
        return instance;
    }

    private async initialize(
        collectionName: string,
        url: string,
        dbName: string
    ): Promise<void> {
        this.client = new MongoClient(url);
        await this.client.connect();
        console.log(`${collectionName} connection established`);
        const db = this.client.db(dbName);
        this.collection = db.collection(collectionName);
    }

    async create(
        document: T & OptionalUnlessRequiredId<Document>
    ): Promise<ObjectId> {
        const result = await this.collection.insertOne(
            document as OptionalUnlessRequiredId<T>
        );
        return result.insertedId;
    }

    async read(query: Filter<T> = {}): Promise<WithId<T>[]> {
        const documents = await this.collection.find(query).toArray();
        return documents;
    }

    async update(query: Filter<T>, update: Partial<T>): Promise<number> {
        const result = await this.collection.updateMany(query, {
            $set: update,
        });
        return result.modifiedCount;
    }

    async delete(query: Filter<T>): Promise<number> {
        const result = await this.collection.deleteMany(query);
        return result.deletedCount;
    }

    async close(): Promise<void> {
        if (this.client) {
            await this.client.close();
            console.log(`${this.collection.collectionName} connection closed`);
        }
    }
}
