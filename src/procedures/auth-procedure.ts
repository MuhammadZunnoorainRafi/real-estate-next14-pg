import { PoolClient } from 'pg';

export const getUserById = async (id: string, db: PoolClient) => {
  const { rows } = await db.query(`SELECT * FROM users WHERE id = $1`, [id]);
  return rows[0];
};

export const getUserByEmail = async (email: string, db: PoolClient) => {
  const { rows } = await db.query(`SELECT * FROM users WHERE email = $1`, [
    email,
  ]);
  return rows[0];
};
