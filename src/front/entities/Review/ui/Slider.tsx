import { Slider as SliderPrimitive } from '@/components/Slider';
import { Card as ReviewCard } from './Card';
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
            opts={{ align: 'center', loop: true }}
            className={cn(className, 'h-full')}
            dotsClassName='bg-white h-2 w-8 rounded transition-all'
            activeDotClassName='bg-[hsl(var(--contrast))] h-2 w-20'
            carouselItemClassName='md:basis-1/3 lg:basis-1/4'
            gap={50}
        >
            <ReviewCard
                image={{
                    src: 'https://img.freepik.com/free-photo/woman-working-office-using-printer_23-2149456957.jpg?t=st=1712742412~exp=1712746012~hmac=8f8f6335967e3b5b4e81ed26412db052801ed195501abec497ca6d484c230800&w=1380',
                    alt: 'woman',
                }}
                description='Отзыв клиента'
                height={height}
            />
            <ReviewCard
                image={{
                    src: 'https://img.freepik.com/free-photo/woman-working-office-using-printer_23-2149456957.jpg?t=st=1712742412~exp=1712746012~hmac=8f8f6335967e3b5b4e81ed26412db052801ed195501abec497ca6d484c230800&w=1380',
                    alt: 'woman',
                }}
                description='Отзыв клиента'
                height={height}
            />
            <ReviewCard
                image={{
                    src: 'https://img.freepik.com/free-photo/woman-working-office-using-printer_23-2149456957.jpg?t=st=1712742412~exp=1712746012~hmac=8f8f6335967e3b5b4e81ed26412db052801ed195501abec497ca6d484c230800&w=1380',
                    alt: 'woman',
                }}
                description='Отзыв клиента'
                height={height}
            />
            <ReviewCard
                image={{
                    src: 'https://img.freepik.com/free-photo/woman-working-office-using-printer_23-2149456957.jpg?t=st=1712742412~exp=1712746012~hmac=8f8f6335967e3b5b4e81ed26412db052801ed195501abec497ca6d484c230800&w=1380',
                    alt: 'woman',
                }}
                description='Отзыв клиента'
                height={height}
            />
        </SliderPrimitive>
    );
};
