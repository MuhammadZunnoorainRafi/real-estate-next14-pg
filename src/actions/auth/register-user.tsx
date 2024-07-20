'use server';
import pool from '@/lib/db';
import { RegUserSchema } from '@/lib/schemas';
import { RegUserType } from '@/lib/types';
import { getUserByEmail } from '@/procedures/auth-procedure';
import bcrypt from 'bcryptjs';
import { redirect } from 'next/navigation';

export const registerUser = async (formData: RegUserType) => {
  const db = await pool.connect();
  try {
    const validations = RegUserSchema.safeParse(formData);
    if (!validations.success) {
      return { error: 'Invalid Fields' };
    }
    const { name, email, password } = validations.data;
    const existingUser = await getUserByEmail(email, db);
    if (existingUser) {
      return { error: 'User already exists' };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await db.query(
      `INSERT INTO users(name,email,password) VALUES($1,$2,$3) RETURNING id`,
      [name, email, hashedPassword]
    );
    if (!rows[0]) {
      return { error: 'User not created' };
    }
    return { success: 'User Registered Successfully' };
  } catch (error) {
    console.log(error);
    return { error: 'Internal Server Error' };
  } finally {
    db.release();
  }
  redirect('/auth/login');
};
