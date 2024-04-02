import { Slider as SliderPrimitive } from '@/components/Slider';
import { Card as ServiceCard } from './Card';
import { cn } from '@/utils';

interface SliderProps {
    className?: string;
    height?: string;
    width?: string;
}

export const Slider = (props: SliderProps) => {
    const { className, height, width, ...otherProps } = props;
    return (
        <SliderPrimitive
            className={cn('w-1/2', className, height, width)}
            dotsClassName='bg-white h-2 w-8 rounded transition-all'
            activeDotClassName='bg-[hsl(var(--orange))] h-2 w-20'
            autoplayDelay={6000}
        >
            <ServiceCard
                height={height}
                width={width}
                img={{
                    src: 'https://fraufluger.ru/wp-content/uploads/2021/02/full_wnb8deop.jpg',
                    alt: 'Видеонаблюдение',
                }}
                title='Видеонаблюдение'
                description='Видеонаблюдение'
            />
            <ServiceCard
                height={height}
                width={width}
                img={{
                    src: 'https://fraufluger.ru/wp-content/uploads/2021/02/full_wnb8deop.jpg',
                    alt: 'Видеонаблюдение',
                }}
                title='Умный дом'
                description='Умный дом'
            />
            <ServiceCard
                height={height}
                width={width}
                img={{
                    src: 'https://fraufluger.ru/wp-content/uploads/2021/02/full_wnb8deop.jpg',
                    alt: 'Видеонаблюдение',
                }}
                title='АППЗ'
                description='Автоматическая противопожарная защита'
            />
        </SliderPrimitive>
    );
};
