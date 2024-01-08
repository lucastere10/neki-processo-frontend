import api from "@/services/api/api"
import axios from "axios";
import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

const nextAuthOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                senha: { label: 'senha', type: 'password' },
                rememberMe: { label: 'rememberMe', type: 'checkbox' }
            },

            async authorize(credentials, req) {

                if (!credentials) {
                    throw new Error('No credentials provided');
                }
                const rememberMe = credentials.rememberMe;

                return api
                    .post(`/api/usuarios/login`, {
                        email: credentials?.email,
                        senha: credentials?.senha,
                    })
                    .then((response) => {
                        return response.data;
                    })
                    .catch((error) => {
                        console.log(error.response);
                        throw new Error(error.response.data.message);
                    }) || null;
            }
        })
    ],
    pages: {
        signIn: '/login'
    },
    session: {
        maxAge: 24 * 60 * 60, // 1 day
    },
    callbacks: {
        async jwt({ token, user }) {
            user && (token.user = user)
            return token
        },
        async session({ session, token }) {
            session = token.user as any
            const rememberMe = token?.rememberMe;
            if (rememberMe) {
                session.expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(); // 30 days
            } else {
                session.expires = new Date(Date.now() + 60 * 60 * 1000).toISOString(); // 1 hour
            }
            return session
        }
    }
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST, nextAuthOptions }