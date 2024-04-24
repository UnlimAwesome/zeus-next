import { oAuthService } from '@/auth/OAuthService';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
    return await oAuthService.handleOAuthRequest(req, res);
};

export const POST = (req: NextRequest, res: NextResponse) => {};
