import { clientRepository } from '@/auth/Client/repository';
import { auth, signIn } from '@/auth/NextAuth';
import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from './service';

class AuthController {
    private readonly authService: AuthService;
    constructor() {
        this.authService = new AuthService();
    }

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

    async authorize(req: NextRequest, res: NextResponse) {
        const searchParams = req.nextUrl.searchParams;

        if (!searchParams.has('client_id')) {
            return this.ErrorResponse(
                'invalid_request',
                'client_id is required',
                400,
            );
        }

        const client = await clientRepository.findById(
            searchParams.get('client_id') as string,
        );

        if (!client) {
            return this.ErrorResponse(
                'invalid_request',
                'client_id is invalid',
                400,
            );
        }
        if (
            searchParams.has('redirect_uri') &&
            !client.redirectUris.find(
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

        const code = await this.authService.generateAuthorizationCode(
            session.user.id,
            client.id,
        );

        redirectParams.set('code', code);
        if (searchParams.has('state')) {
            redirectParams.set('state', searchParams.get('state')!);
        }

        const redirectUri =
            (searchParams.get('redirect_uri') || client.redirectUris[0]) +
            '?' +
            redirectParams.toString();

        return NextResponse.redirect(redirectUri);
    }

    async token(req: NextRequest, res: NextResponse) {
        // Post
        const reqBody = await req.json();
        if (!reqBody)
            return this.ErrorResponse(
                'invalid_request',
                'request body is required',
                400,
            );

        if (!reqBody.grant_type)
            return this.ErrorResponse(
                'invalid_request',
                'grant_type is required',
                400,
            );

        if (reqBody.grant_type !== 'authorization_code')
            return this.ErrorResponse(
                'invalid_request',
                'grant_type is invalid',
                400,
            );

        if (!reqBody.code)
            return this.ErrorResponse(
                'invalid_request',
                'code is required',
                400,
            );

        if (!reqBody.client_id)
            return this.ErrorResponse(
                'invalid_request',
                'client_id is required',
                400,
            );

        if (!reqBody.client_secret)
            return this.ErrorResponse(
                'invalid_request',
                'client_secret is required',
                400,
            );

        const client = await clientRepository.findById(reqBody.client_id);

        if (!client)
            return this.ErrorResponse(
                'invalid_request',
                'client_id is invalid',
                400,
            );

        let jwt;
        try {
            jwt = await this.authService.generateAccessToken(
                reqBody.code,
                client.id,
                reqBody.client_secret,
            );
        } catch (error: any) {
            if (error.message === 'Access token already exists') {
                return this.ErrorResponse('forbidden', 'code is invalid', 403);
            }
        }

        return NextResponse.json({ token: jwt });
    }

    async validate(req: NextRequest, res: NextResponse) {
        const reqBody = await req.json();
        if (!reqBody)
            return this.ErrorResponse(
                'invalid_request',
                'request body is required',
                400,
            );

        if (!reqBody.token)
            return this.ErrorResponse(
                'invalid_request',
                'token is required',
                400,
            );
        const isTokenValid = this.authService.validateToken(reqBody.token);

        return NextResponse.json({ valid: isTokenValid });
    }
}

export const authController = new AuthController();
