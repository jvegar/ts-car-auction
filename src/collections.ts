import { MongoClient, Collection } from 'mongodb';

export class DynamicCollection {
  private collection!: Collection<any>;

  constructor(collectionName: string, url: string, dbName: string) {
    this.initialize(collectionName, url, dbName);
  }
  private async initialize(collectionName: string, url: string, dbName: string): Promise<void> {
    const client = new MongoClient(url);
    await client.connect();
    const db = client.db(dbName);
    this.collection = db.collection(collectionName);
  }

  async create(document: any): Promise<any> {
    const result = await this.collection.insertOne(document);
    return result.insertedId;
  }

  async read(query: object = {}): Promise<any[]> {
    const documents = await this.collection.find(query).toArray();
    return documents;
  }

  async update(query: object, update: object): Promise<number> {
    const result = await this.collection.updateMany(query, update);
    return result.modifiedCount;
  }

  async delete(query: object): Promise<number> {
    const result = await this.collection.deleteMany(query);
    return result.deletedCount;
  }
}
