import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

const userMock = {
    email: 'L6TJt@example.com',
    password: 'password',
};

declare module 'next-auth' {
    interface Session {
        user: {
            email: string;
            role: 'admin' | 'customer';
        } & DefaultSession['user'];
    }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },
            authorize: async (credentials) => {
                let user = null;
                if (
                    credentials.email === userMock.email &&
                    credentials.password === userMock.password
                ) {
                    user = userMock;
                }
                return user;
            },
        }),
    ],
});
