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
                'xl:h-[calc(100svh-3*var(--header-height))]',
                className,
            )}
            {...otherProps}
        >
            <div className={cn('size-full px-[5%] pb-20 pt-20 xl:pt-0')}>
                <ReviewSlider
                    className='size-full'
                    height='h-full'
                />
            </div>
        </section>
    );
};
