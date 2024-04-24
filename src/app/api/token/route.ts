import { oAuthService } from '@/auth/OAuthService';
import { NextRequest, NextResponse } from 'next/server';

export const GET = (req: NextRequest, res: NextResponse) => {
    return oAuthService.handleTokenRequest(req, res);
};

export const POST = (req: NextRequest, res: NextResponse) => {
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
};
