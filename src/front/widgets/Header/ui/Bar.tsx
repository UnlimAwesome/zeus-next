import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Separator } from '@/components/ui/separator';
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
            className={cn('relative flex w-full items-center', className)}
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
            <Separator className='absolute bottom-0 left-0 right-0' />
        </header>
    );
};
