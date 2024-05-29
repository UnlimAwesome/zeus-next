import { userService } from '@/auth/User/service';
import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string;
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
                const user = await userService.validateUserCredentials(
                    credentials?.email as string,
                    credentials?.password as string,
                );
                if (!user) return null;
                return { id: user.id, role: user.role };
            },
        }),
    ],
});
