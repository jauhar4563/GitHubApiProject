"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const migrate = async () => {
    try {
        const migrationDir = path_1.default.join(__dirname, '../../', 'migrations');
        const client = await db_1.default.connect();
        // Get all migration files
        const files = fs_1.default.readdirSync(migrationDir)
            .filter(file => file.endsWith('.sql'))
            .sort();
        for (const file of files) {
            const filePath = path_1.default.join(migrationDir, file);
            const sql = fs_1.default.readFileSync(filePath, 'utf8');
            // Execute SQL script
            await client.query(sql);
            console.log(`Migration applied: ${file}`);
        }
        client.release();
        console.log('All migrations applied successfully.');
        process.exit(0);
    }
    catch (err) {
        console.error('Error applying migrations:', err);
        process.exit(1);
    }
};
migrate();
