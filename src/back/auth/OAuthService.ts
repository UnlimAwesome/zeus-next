import { auth, signIn } from '@/auth/NextAuth';
import { oAuthClientController } from '@/auth/oAuthClient/service';
import { randomBytes } from 'crypto';
import { NextRequest, NextResponse } from 'next/server';

import { EncryptJWT, SignJWT } from 'jose';

class OAuthService {
    ErrorResponse = (
        error: string,
        error_description?: string,
        status = 400,
    ) => {
        return NextResponse.json(
            !error_description ? { error } : { error, error_description },
            { status },
        );
    };

    createAuthCode() {
        const code = randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 10);
        return { code, expiresAt };
    }

    async signToken(secret: string, payload: Record<string, any>) {
        const encodedSecret = new TextEncoder().encode(secret);

        const jwt = await new EncryptJWT(payload)
            .setProtectedHeader({
                alg: 'dir',
                enc: 'A128CBC-HS256',
            })
            .setIssuedAt()
            .setExpirationTime('10m')
            .encrypt(encodedSecret);

        return jwt;
    }

    async handleOAuthRequest(req: NextRequest, res: NextResponse) {
        const searchParams = req.nextUrl.searchParams;

        if (!searchParams.has('client_id')) {
            return this.ErrorResponse(
                'invalid_request',
                'client_id is required',
                400,
            );
        }

        const oAuthClient = await oAuthClientController.findById(
            searchParams.get('client_id') as string,
        );

        if (!oAuthClient) {
            return this.ErrorResponse(
                'invalid_request',
                'client_id is invalid',
                400,
            );
        }
        if (
            searchParams.has('redirect_uri') &&
            !oAuthClient.redirectUris.find(
                (redirectUri) =>
                    redirectUri === searchParams.get('redirect_uri'),
            )
        ) {
            return this.ErrorResponse(
                'invalid_request',
                'redirect_uri is invalid',
                400,
            );
        }
        if (!searchParams.has('response_type')) {
            return this.ErrorResponse(
                'invalid_request',
                'response_type is required',
                400,
            );
        }
        if (
            searchParams.get('response_type') !== 'code' &&
            searchParams.get('response_type') !== 'token'
        ) {
            return this.ErrorResponse(
                'invalid_request',
                'response_type is invalid',
                400,
            );
        }

        const session = await auth();
        if (!session) {
            await signIn(
                undefined,
                { redirectTo: '/api/auth?' + searchParams.toString() },
                searchParams,
            );
            return;
        }

        const redirectParams = new URLSearchParams();

        const { code, expiresAt } = this.createAuthCode();
        await oAuthClientController.storeAuthCode(
            session.user.email,
            code,
            expiresAt,
        );

        redirectParams.set('code', code);
        if (searchParams.has('state')) {
            redirectParams.set('state', searchParams.get('state')!);
        }
        console.log(redirectParams.toString());

        const redirectUri =
            (searchParams.get('redirect_uri') || oAuthClient.redirectUris[0]) +
            '?' +
            redirectParams.toString();

        console.log(redirectUri);
        return NextResponse.redirect(redirectUri);
    }

    handleTokenRequest(req: NextRequest, res: NextResponse<unknown>) {
        console.log(req.nextUrl.searchParams.toString());
        return NextResponse.json(
            {
                access_token:
                    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c.',
                token_type: 'bearer',
                expires_in: 3600,
            },
            { status: 200 },
        );
    }
}

export const oAuthService = new OAuthService();
