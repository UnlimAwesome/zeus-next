import { Separator } from '@/components/ui/separator';
import { NewsSlider } from '@/entities/News';
import { cn } from '@/front/shared/lib/utils';
import { HTMLAttributes } from 'react';

interface ViewProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const View = (props: ViewProps) => {
    const { className, ...otherProps } = props;
    return (
        <section
            className={cn(
                'xl:h-[calc(100svh-var(--header-height))]',
                className,
            )}
            {...otherProps}
        >
            <h1
                className={cn(
                    'flex h-[var(--header-height)] w-full items-center',
                    'justify-center bg-black text-center text-6xl text-white',
                )}
            >
                Категории работ
            </h1>
            <div
                className={cn(
                    'flex flex-col xl:h-[calc(100svh-3*var(--header-height))]',
                    'items-center gap-5 bg-[var(--brown)] px-[5%] xl:gap-10',
                    'py-10 md:flex-row',
                )}
            ></div>
        </section>
    );
};
