import { ServiceSlider } from '@/entities/Service';
import { cn } from '@/front/shared/lib/utils';

interface ViewProps {
    className?: string;
}

export const View = (props: ViewProps) => {
    const { className } = props;
    return (
        <section
            className={cn(
                'mb-10 flex h-[calc(100svh-var(--header-height))] w-full',
                'flex-col items-center justify-evenly gap-10 px-[5%] py-10',
                'sm:py-20 md:mb-0 md:flex-row',
                className,
            )}
        >
            <div className='flex h-full shrink basis-2/5 flex-col gap-10 sm:flex-row md:flex-col'>
                <div className='min-h-24 basis-2/5 bg-[var(--brown)] text-center text-3xl text-white'>
                    LOGO
                </div>
                <div
                    className={cn(
                        'flex basis-3/5 items-center justify-center text-wrap rounded-2xl',
                        ' bg-[var(--brown)] text-center text-2xl font-medium text-white md:text-3xl',
                    )}
                >
                    <p>Краткая информация о компании: цель, деятельность</p>
                </div>
            </div>
            <ServiceSlider
                className={cn('w-full shrink basis-3/5', 'md:w-3/5')}
                height='h-full'
            />
        </section>
    );
};
