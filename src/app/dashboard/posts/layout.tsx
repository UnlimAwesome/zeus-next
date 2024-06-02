'use client';

import { PostsLayout } from '@/widgets/PostsLayout';

export default function Layout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <PostsLayout>{children}</PostsLayout>;
}
