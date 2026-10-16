import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        name: { label: "Name", type: "text" },
        role: { label: "Role", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        let user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user && credentials.name) {
          user = await prisma.user.create({
            data: {
              email: credentials.email,
              name: credentials.name,
              role: credentials.role || "CONSUMER",
              pointsBalance: 0,
            },
          });
        }

        if (user) {
          return { id: user.id, email: user.email, name: user.name, role: user.role };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string;
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  pages: { signIn: "/auth/signin" },
});

export { handler as GET, handler as POST };
