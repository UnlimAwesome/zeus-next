'use client';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { cn } from '@/front/shared/lib/utils';
import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { IconContext } from 'react-icons';
import { IoCloudyNightOutline } from 'react-icons/io5';
import { LuMoonStar, LuSun } from 'react-icons/lu';

export const ThemeSwitcher = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const nextTheme = (theme: string) => {
        switch (theme) {
            case 'light':
                return 'dark';
            case 'dark':
                return 'system';
            case 'system':
                return 'light';
        }
    };
    return (
        <ContextMenu>
            <ContextMenuTrigger
                className={cn('size-6')}
                onClick={() => setTheme(nextTheme(theme!)!)}
            >
                <IconContext.Provider
                    value={{
                        size: '100%',
                        className: 'hover:scale-110 transition',
                    }}
                >
                    <LuSun
                        className={theme === 'system' ? 'block' : 'hidden'}
                    />
                    <LuMoonStar
                        className={theme === 'light' ? 'block' : 'hidden'}
                    />
                    <IoCloudyNightOutline
                        className={theme === 'dark' ? 'block' : 'hidden'}
                    />
                </IconContext.Provider>
            </ContextMenuTrigger>
            <ContextMenuContent>
                <ContextMenuItem onClick={() => setTheme('light')}>
                    Светлая
                </ContextMenuItem>
                <ContextMenuItem onClick={() => setTheme('dark')}>
                    Темная
                </ContextMenuItem>
                <ContextMenuItem onClick={() => setTheme('system')}>
                    Как в системе
                </ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    );
};
