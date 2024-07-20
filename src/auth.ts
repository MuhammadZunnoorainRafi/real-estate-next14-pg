import PostgresAdapter from '@auth/pg-adapter';
import NextAuth from 'next-auth';
import pool from './lib/db';
import Credentials from 'next-auth/providers/credentials';
import { LogUserSchema } from './lib/schemas';
import { getUserByEmail, getUserById } from './procedures/auth-procedure';
import bcrypt from 'bcryptjs';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PostgresAdapter(pool),
  secret: process.env.AUTH_SECRET,
  session: { strategy: 'jwt' },
  pages: { signIn: '/auth/login' },
  callbacks: {
    session: async ({ session, token }) => {
      if (session && token.sub) {
        session.user.id = token.sub;
        session.user.name = token.name;
        session.user.email = token.email as string;
      }

      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const db = await pool.connect();
      const user = await getUserById(token.sub, db);
      db.release();
      token.name = user.name;
      token.email = user.email;
      if (!user) return token;

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
