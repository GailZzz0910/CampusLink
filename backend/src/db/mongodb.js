import dns from 'node:dns';
import { MongoClient } from 'mongodb';

let client;
let database;

function configureDns() {
  const servers = (process.env.MONGODB_DNS_SERVERS || '')
    .split(',')
    .map((server) => server.trim())
    .filter(Boolean);

  if (servers.length) dns.setServers(servers);
}

export async function checkMongoDb() {
  if (!process.env.MONGODB_URI || !process.env.MONGODB_DB ||
      process.env.MONGODB_URI === 'YOUR_MONGODB_ATLAS_CONNECTION_STRING') {
    return { status: 'NOT_CONFIGURED' };
  }

  try {
    if (!client) {
      configureDns();
      client = new MongoClient(process.env.MONGODB_URI, { serverSelectionTimeoutMS: 2000 });
      await client.connect();
      database = client.db(process.env.MONGODB_DB);
    }

    const result = await client.db('admin').command({ ping: 1 });
    return {
      status: result.ok === 1 ? 'CONNECTED' : 'UNAVAILABLE',
      database: database.databaseName,
    };
  } catch (error) {
    client = undefined;
    database = undefined;
    return {
      status: 'UNAVAILABLE',
    };
  }
}

export async function closeMongoDb() {
  if (client) await client.close();
  client = undefined;
  database = undefined;
}

// TODO (STUDENT IMPLEMENTATION):
// Add collections, indexes, service-request operations, activity logs,
// integration events, and Change Streams without changing the API contract.
