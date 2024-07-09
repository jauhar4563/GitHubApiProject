import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'github_api_db',
  password: '4563',
  port: 3000,
});

export default pool;
