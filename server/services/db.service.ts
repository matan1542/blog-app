import { MongoClient, Db, Collection } from "mongodb";

export { getCollection };

// Database Name
const dbName = "blog";

let dbConn: Db | null = null;

async function getCollection<T>(
  collectionName: string
): Promise<Collection<T>> {
  try {
    const db = await connect();
    const collection = db.collection<T>(collectionName);
    return collection;
  } catch (err) {
    console.log("ERROR: cannot connect to DB");
    throw err;
  }
}

async function connect(): Promise<Db> {
  if (dbConn) return dbConn;
  try {
    const client = await MongoClient.connect(
      process.env.MONGO_DB_KEY as string
    );
    const db = client.db(dbName);
    dbConn = db;
    return db;
  } catch (err) {
    console.error("Cannot Connect to DB", err);
    throw err;
  }
}
