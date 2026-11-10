import pg from 'pg';

const { Client } = pg;
let client;

export async function checkPostgres() {
  if (!process.env.DATABASE_URL || process.env.DATABASE_URL === 'YOUR_SUPABASE_POSTGRESQL_URL') return { status: 'NOT_CONFIGURED' };

  try {
    if (!client) {
      client = new Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
        connectionTimeoutMillis: 2000,
      });
      await client.connect();
    }

    const result = await client.query('SELECT 1 AS connected');
    return { status: result.rows[0]?.connected === 1 ? 'CONNECTED' : 'UNAVAILABLE' };
  } catch (error) {
    client = undefined;
    console.error('PostgreSQL health check failed:', error.message);
    return { status: 'UNAVAILABLE' };
  }
}

export async function closePostgres() {
  if (client) await client.end();
  client = undefined;
}

// TODO (STUDENT IMPLEMENTATION):
// Add schema, authentication, parameterized queries, transactions,
// reservation concurrency protection, idempotency, and outbox operations.
