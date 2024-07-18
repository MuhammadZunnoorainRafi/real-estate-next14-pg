const { Pool } = require('pg');
require('colors');

const createUserTable = async (db) => {};

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
  .catch((error) => console.log(`${error}`.red));
