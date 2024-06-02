'use client';

import { Dialog, DialogTrigger } from '@/components/ui/dialog';
import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarTrigger,
} from '@/components/ui/menubar';
import { NewPostForm } from '@/features/Post';

export function Layout({
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
                        <div className='flex flex-col'>
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
                            <Dialog modal>
                                <DialogTrigger>
                                    <MenubarItem
                                        onSelect={(e) => {
                                            e.preventDefault();
                                        }}
                                    >
                                        <span>Для наших пользователей</span>
                                    </MenubarItem>
                                </DialogTrigger>
                                <NewPostForm type='Для наших пользователей' />
                            </Dialog>
                        </div>
                    </MenubarContent>
                </MenubarMenu>
            </Menubar>

            {children}
        </div>
    );
}
