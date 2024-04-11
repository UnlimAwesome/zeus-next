import { SectionHeader } from '@/components/SectionHeader';
import { ReviewSlider } from '@/entities/Review';
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
                'xl:h-[calc(100svh-2*var(--header-height))]',
                className,
            )}
            {...otherProps}
        >
            <SectionHeader>Отзывы</SectionHeader>
            <div
                className={cn(
                    'h-[calc(100%-var(--header-height))] px-[5%] pb-20 pt-20',
                )}
            >
                <ReviewSlider
                    className='size-full'
                    height='h-full'
                />
            </div>
        </section>
    );
};
