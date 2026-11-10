import 'dotenv/config';
import app from './app.js';
import { closeMongoDb } from './db/mongodb.js';
import { closePostgres } from './db/postgres.js';

const port = Number.parseInt(process.env.PORT || '4000', 10);

const server = app.listen(port, () => {
  console.log(`CampusLink API listening on http://localhost:${port}`);
});

async function shutdown() {
  await Promise.allSettled([closeMongoDb(), closePostgres()]);
  server.close(() => process.exit(0));
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
