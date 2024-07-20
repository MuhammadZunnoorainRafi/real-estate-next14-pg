'use server';
import { signIn } from '@/auth';
import pool from '@/lib/db';
import { LogUserSchema } from '@/lib/schemas';
import { LogUserType } from '@/lib/types';
import { getUserByEmail } from '@/procedures/auth-procedure';
import bcrypt from 'bcryptjs';
import { AuthError } from 'next-auth';

export const loginUser = async (formData: LogUserType) => {
  const db = await pool.connect();
  try {
    const validations = LogUserSchema.safeParse(formData);
    if (!validations.success) {
      return { error: 'Invalid Fields' };
    }
    const { email, password } = validations.data;
    const user = await getUserByEmail(email, db);
    if (!user) {
      return { error: 'User not exists' };
    }
    const matchedPassword = await bcrypt.compare(password, user.password);
    if (!matchedPassword) {
      return { error: 'Invalid email or password' };
    }
    await signIn('credentials', { email, password, redirectTo: '/' });
    return { success: 'User logged In' };
  } catch (error) {
    console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin': {
          return { error: 'Invalide email or password' };
        }
        default: {
          return { error: 'Internal Server Error' };
        }
      }
    }
    throw error;
  } finally {
    db.release();
  }
};
