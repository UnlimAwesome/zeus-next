import { signIn } from '@/auth/NextAuth';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/front/shared/lib/utils';
import localFont from 'next/font/local';
import Link from 'next/link';
import { HTMLAttributes } from 'react';

const headerFont = localFont({
    src: './eurostyle-normal.woff2',
    display: 'swap',
});

interface BarProps extends HTMLAttributes<HTMLElement> {
    className?: string;
}

export const Bar = (props: BarProps) => {
    const { className, ...otherProps } = props;

    return (
        <header
            className={cn(
                'relative flex w-full items-center justify-between px-[5%] md:justify-normal',
                className,
            )}
            {...otherProps}
        >
            <div className='text-white'>LOGO</div>
            <div
                className={cn(
                    headerFont.className,
                    'absolute inset-0',
                    'pointer-events-none ml-auto flex h-full flex-col justify-center xl:justify-end',
                )}
            >
                <p className='text-center align-text-bottom text-5xl font-bold tracking-wider text-white md:text-7xl md:leading-[.75]'>
                    ТОПРУС
                </p>
                <p className='hidden text-center text-2xl text-white xl:block'>
                    Спасение утопающих - дело рук самих утопающих
                </p>
            </div>
            {/* <ThemeSwitcher className='ml-auto mr-2 md:mr-4' /> */}
            <div className='ml-auto flex h-full flex-col items-end justify-center text-white'>
                <Link
                    href='/'
                    className='hidden select-none md:block'
                >
                    Регистрация
                </Link>
                <form>
                    <button
                        formAction={async () => {
                            'use server';
                            await signIn();
                        }}
                        className='select-none'
                    >
                        Войти
                    </button>
                </form>
            </div>
            <Separator className='absolute bottom-0 left-0 right-0' />
        </header>
    );
};
