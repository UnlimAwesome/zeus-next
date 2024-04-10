import { Slider as SliderPrimitive } from '@/components/Slider';
import { Card as ServiceCard } from './Card';
import { cn } from '@/utils';
import { ClassValue } from 'clsx';

interface SliderProps {
    className?: string;
    height?: ClassValue;
    width?: string;
}

export const Slider = (props: SliderProps) => {
    const { className, height, width, ...otherProps } = props;
    return (
        <SliderPrimitive
            className={cn('w-1/2', className)}
            dotsClassName='bg-white h-2 w-8 rounded-full transition-all border-[1px] border-[hsl(var(--dark))] box-content'
            activeDotClassName='bg-[hsl(var(--contrast))] h-2 w-20 '
            autoplayDelay={6000}
            height={height}
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
