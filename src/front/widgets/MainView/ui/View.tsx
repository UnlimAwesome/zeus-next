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
                'mb-10 flex w-full md:h-[calc(100svh-var(--header-height))]',
                'flex-col items-center justify-evenly gap-10 px-[5%] py-10',
                'sm:py-20 md:flex-row xl:mb-0',
                className,
            )}
        >
            <div
                className={cn(
                    'flex h-full basis-2/5 items-center justify-center text-wrap rounded-2xl p-4',
                    ' bg-[var(--dark-opacity)] text-center text-2xl font-medium text-white md:text-3xl',
                )}
            >
                <p className='text-pretty text-center text-xl md:text-3xl'>
                    ТОПРУС – команда опытных специалистов, основной целью
                    которой является разработка инновационных программных
                    решений для улучшения бизнес-процессов и повышения их
                    эффективности. В основе наших разработок лежат технологии
                    искусственного интеллекта (AI), применяемые для реализации
                    систем технической безопасности, интернета вещей (IoT) и
                    промышленного интернета вещей (IIoT).
                </p>
            </div>

            <ServiceSlider
                className={cn('h-full w-full shrink basis-3/5', 'md:w-3/5')}
                height='h-full'
            />
        </section>
    );
};
