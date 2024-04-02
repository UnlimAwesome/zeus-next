'use client';
import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { IconContext } from 'react-icons';
import { IoCloudyNightOutline } from 'react-icons/io5';
import { LuMoonStar, LuSun } from 'react-icons/lu';

interface IThemeSwithcher {
    className?: string;
}
export const ThemeToggle = (props: IThemeSwithcher) => {
    const { className } = props;

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
                className={className}
                onClick={() => setTheme(nextTheme(theme!)!)}
                role='button'
                data-testid='theme-switcher'
            >
                <IconContext.Provider
                    value={{
                        // size: 'inherit',
                        className:
                            'hover:scale-110 transition size-6 self-center  stroke-white',
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
            <ContextMenuContent className='font-bold'>
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
