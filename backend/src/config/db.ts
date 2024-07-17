import dotenv from 'dotenv';
dotenv.config();

import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL || "postgres://default:6BDikPgFHS3z@ep-shy-block-a48i3q72-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require",
});

pool.on('connect', () => {
  console.log('Connected to the database');
});

pool.on('error', (err: Error) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

export default pool;
