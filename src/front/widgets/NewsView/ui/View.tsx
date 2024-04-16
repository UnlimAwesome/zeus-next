import { SectionHeader } from '@/components/SectionHeader';
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
            <SectionHeader>Новости</SectionHeader>
            <div
                className={cn(
                    'flex flex-col xl:h-[calc(100svh-3*var(--header-height))]',
                    'items-center gap-5 bg-[var(--dark-opacity)] px-[5%] xl:gap-10',
                    'py-10 md:flex-row xl:pb-[var(--header-height)]',
                )}
            >
                <NewsSlider
                    className='-mr-4 h-4/5 w-full shrink grow-0 md:h-full md:w-[45%] md:basis-1/2'
                    height='h-full'
                ></NewsSlider>
                <Separator
                    orientation='vertical'
                    className='hidden w-1 rounded-full md:block'
                />
                <NewsSlider
                    className='h-4/5 w-full shrink grow-0 md:h-full md:w-[45%] md:basis-1/2'
                    height='h-full'
                ></NewsSlider>
            </div>
        </section>
    );
};
