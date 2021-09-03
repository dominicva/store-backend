import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const { PG_HOST, PG_DB, PG_USER, PG_PASSWORD } = process.env;

const pool = new Pool({
  host: PG_HOST,
  database: PG_DB,
  user: PG_USER,
  password: PG_PASSWORD,
});

export default pool;
