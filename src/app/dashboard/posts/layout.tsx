'use client';

import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';

export default function PostsLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className='size-full p-4'>
            <Menubar className='relative h-12 px-2'>
                <MenubarMenu>
                    <MenubarTrigger>Создать</MenubarTrigger>
                    <MenubarContent>
                        <MenubarItem>Продвижение компании</MenubarItem>
                        <MenubarItem>Для пользователей</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {children}
        </div>
    );
}
