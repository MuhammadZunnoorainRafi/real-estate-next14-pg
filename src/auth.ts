import PostgresAdapter from '@auth/pg-adapter';
import NextAuth from 'next-auth';
import pool from './lib/db';
import Credentials from 'next-auth/providers/credentials';
import { LogUserSchema } from './lib/schemas';
import { getUserByEmail } from './procedures/auth-procedure';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/login' },
  callbacks: {
    session: async ({ session }) => {
      return session;
    },
    jwt: async ({ token }) => {
      return token;
    },
  },
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validation = LogUserSchema.safeParse(credentials);
        if (validation.success) {
          const { email, password } = validation.data;
          const db = await pool.connect();
          const user = await getUserByEmail(email, db);
          db.release();
          if (!user || !user.password) return null;

          const matchedPassword = await bcrypt.compare(password, user.password);
          if (matchedPassword) return user;
        }
        return null;
      },
    }),
  ],
});
