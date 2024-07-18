const { Pool } = require('pg');
require('colors');

const createUserTable = async (db) => {
  await db.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
  await db.query(`CREATE TABLE IF NOT EXISTS users(
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMPTZ
        )`);
};

const main = async () => {
  const pool = new Pool({
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    port: +process.env.DATABASE_PORT,
  });

  const db = await pool.connect();

  await createUserTable(db);

  db.release();
};

main()
  .then(() => console.log('Tables created successfully 🎉'.cyan))
  .catch((error) => {
    console.log(`${error}`.red);
    process.exit(1);
  });
