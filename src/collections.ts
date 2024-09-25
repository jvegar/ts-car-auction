import { MongoClient, Collection, ObjectId } from 'mongodb'

export class DynamicCollection {
    private collection!: Collection<any>
    private client!: MongoClient

    private constructor() {}

    static async create(
        collectionName: string,
        url: string,
        dbName: string
    ): Promise<DynamicCollection> {
        const instance = new DynamicCollection()
        await instance.initialize(collectionName, url, dbName)
        return instance
    }

    private async initialize(
        collectionName: string,
        url: string,
        dbName: string
    ): Promise<void> {
        this.client = new MongoClient(url)
        await this.client.connect()
        console.log(`${collectionName} connection established`)
        const db = this.client.db(dbName)
        this.collection = db.collection(collectionName)
    }

    async create(document: any): Promise<ObjectId> {
        const result = await this.collection.insertOne(document)
        return result.insertedId
    }

    async read(query: object = {}): Promise<any[]> {
        const documents = await this.collection.find(query).toArray()
        return documents
    }

    async update(query: object, update: object): Promise<number> {
        const result = await this.collection.updateMany(query, update)
        return result.modifiedCount
    }

    async delete(query: object): Promise<number> {
        const result = await this.collection.deleteMany(query)
        return result.deletedCount
    }

    async close(): Promise<void> {
        if (this.client) {
            await this.client.close()
            console.log(`${this.collection.collectionName} connection closed`)
        }
    }
}
