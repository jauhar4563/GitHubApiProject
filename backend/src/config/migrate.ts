import pool from './db';
import fs from 'fs';
import path from 'path';

const migrate = async () => {
  try {
    const migrationDir = path.join(__dirname, '../../', 'migrations');
    const client = await pool.connect();

    // Get all migration files
    const files = fs.readdirSync(migrationDir)
      .filter(file => file.endsWith('.sql'))
      .sort();

    for (const file of files) {
      const filePath = path.join(migrationDir, file);
      const sql = fs.readFileSync(filePath, 'utf8');

      // Execute SQL script
      await client.query(sql);
      console.log(`Migration applied: ${file}`);
    }

    client.release();
    console.log('All migrations applied successfully.');
    process.exit(0);
  } catch (err) {
    console.error('Error applying migrations:', err);
    process.exit(1);
  }
};

migrate();
