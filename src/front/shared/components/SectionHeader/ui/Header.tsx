import { cn } from '@/front/shared/lib/utils';

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

export const Header = (props: HeaderProps) => {
    const { className, children, ...otherProps } = props;
    return (
        <h1
            className={cn(
                'flex h-[var(--header-height)] w-full items-center text-3xl',
                'justify-center bg-[hsl(var(--dark))] text-center text-white md:text-6xl',
                className,
            )}
        >
            {children}
        </h1>
    );
};
