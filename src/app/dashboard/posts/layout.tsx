'use client';

import { Menubar, MenubarMenu, MenubarTrigger } from '@/components/ui/menubar';

export default function PostsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='size-full'>
            <Menubar className='relative h-12 px-2'>
                <MenubarMenu>
                    <MenubarTrigger>Создать</MenubarTrigger>
                </MenubarMenu>
            </Menubar>

            {children}
        </div>
    );
}
