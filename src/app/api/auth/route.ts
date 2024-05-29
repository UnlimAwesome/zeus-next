import { authController } from '@/auth/Auth/controller';
import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest, res: NextResponse) => {
    return await authController.authorize(req, res);
};
