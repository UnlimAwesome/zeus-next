'use client';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/front/shared/lib/utils';
import Link from 'next/link';

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className={cn('flex h-full min-w-full')}>
            <div className='relative flex min-h-full w-1/6 shrink-0 flex-col gap-2 p-6 text-lg'>
                <Link
                    href='/admin/posts'
                    className='block w-full rounded text-center hover:bg-white hover:text-black'
                >
                    Новости
                </Link>
                <Link
                    href='/admin/posts'
                    className='block w-full rounded text-center hover:bg-white hover:text-black'
                >
                    Отзывы
                </Link>
                <Link
                    href='/admin/posts'
                    className='block w-full rounded text-center hover:bg-white hover:text-black'
                >
                    Домены
                </Link>
                <Separator
                    orientation='vertical'
                    className='absolute bottom-0 right-0 top-0 h-full w-[1px]'
                />
            </div>
            <div className='size-full'>{children}</div>
        </div>
    );
}
