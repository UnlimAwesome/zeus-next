import { SectionHeader } from '@/components/SectionHeader';
import { ContactCard, ContactYandexMap } from '@/entities/Contact';
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
                'xl:h-[calc(100svh-1*var(--header-height))]',
                className,
            )}
            {...otherProps}
        >
            <SectionHeader>Связаться с нами</SectionHeader>
            <div
                className={cn(
                    'flex min-h-[calc(100svh-2*var(--header-height))] justify-between gap-20 py-10',
                )}
            >
                <ContactCard className='basis-1/4 rounded-l-none rounded-r-2xl' />
                <ContactYandexMap className='basis-3/4 overflow-hidden rounded-l-2xl' />
            </div>
        </section>
    );
};
