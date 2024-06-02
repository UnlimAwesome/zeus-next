'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { NewPostForm } from '@/features/Post';

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
                        <Dialog modal>
                            <DialogTrigger>
                                <MenubarItem
                                    onSelect={(e) => {
                                        e.preventDefault();
                                    }}
                                >
                                    <span>Продвижение компании</span>
                                </MenubarItem>
                            </DialogTrigger>
                            <NewPostForm type='Продвижение компании' />
                        </Dialog>
                        <MenubarItem>Для пользователей</MenubarItem>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {children}
        </div>
    );
}
