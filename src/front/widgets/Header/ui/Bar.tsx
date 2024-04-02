import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { cn } from '@/front/shared/lib/utils';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

interface BarProps extends HTMLAttributes<HTMLElement> {
    className?: string;
}

export const Bar = (props: BarProps) => {
    const { className, ...otherProps } = props;
    return (
        <header
            className={cn('flex w-full items-center', className)}
            {...otherProps}
        >
            <ThemeSwitcher className='ml-auto mr-8' />
            <div className='mr-8 flex h-full flex-col items-end justify-center text-white'>
                <Link
                    href='/'
                    className='select-none'
                >
                    Регистрация
                </Link>
                <Link
                    href='/'
                    className='select-none'
                >
                    Войти
                </Link>
            </div>
        </header>
    );
};
