import { SectionHeader } from '@/components/SectionHeader';
import { ContactCard, ContactYandexMap } from '@/entities/Contact';
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
                    'flex min-h-[calc(100svh-2*var(--header-height))] flex-col gap-20 px-[5%] py-10',
                    ' md:flex-row md:justify-between md:px-0',
                )}
            >
                <ContactCard className='basis-1/4 rounded-2xl md:rounded-none md:rounded-l-none md:rounded-r-2xl' />
                <ContactYandexMap className='min-h-96 overflow-hidden rounded-2xl md:basis-3/4 md:rounded-none md:rounded-l-2xl' />
            </div>
        </section>
    );
};
