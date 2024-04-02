'use client';
import {
    Carousel as CarouselComponent,
    CarouselApi,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { cn } from '@/front/shared/lib/utils';
import Autoplay from 'embla-carousel-autoplay';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface SwiperProps {
    className?: string;
    dotsClassName?: string;
    activeDotClassName?: string;
    autoplayDelay?: number;
    navigation?: boolean;
    children: ReactNode[];
}

export const Carousel = (props: SwiperProps) => {
    const {
        className,
        children,
        dotsClassName,
        activeDotClassName,
        autoplayDelay,
        navigation,
        ...otherProps
    } = props;

    const [api, setApi] = useState<CarouselApi>();
    const [currentSlide, setCurrentSlide] = useState(0);
    const [countSlides, setCountSlides] = useState(0);
    const autoplay = useRef(
        Autoplay({ delay: autoplayDelay, stopOnInteraction: true }),
    );

    useEffect(() => {
        if (!api) return;

        setCurrentSlide(api.selectedScrollSnap());
        api.on('select', () => {
            setCurrentSlide(api.selectedScrollSnap());
        });
        setCountSlides(api.scrollSnapList().length);
    }, [api]);

    return (
        <CarouselComponent
            setApi={setApi}
            plugins={autoplayDelay ? [autoplay.current] : []}
            className={cn(className)}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={autoplay.current.play}
            opts={{ slidesToScroll: 1, align: 'start' }}
            {...otherProps}
        >
            <CarouselContent className='size-full'>
                {children.map((child, index) => (
                    <CarouselItem
                        key={index}
                        className='select-none'
                    >
                        {child}
                    </CarouselItem>
                ))}
            </CarouselContent>
            {navigation && (
                <>
                    <CarouselPrevious className='left-3 sm:max-lg:hidden' />
                    <CarouselNext className='right-3 sm:max-lg:hidden' />
                </>
            )}
            {dotsClassName && (
                <div className='flex h-10 w-full items-center justify-center gap-4'>
                    {[...Array(countSlides)].map((_, i) => {
                        return (
                            <div
                                onClick={() => api?.scrollTo(i)}
                                key={i}
                                className={cn(
                                    'cursor-pointer',
                                    dotsClassName,
                                    i === currentSlide
                                        ? activeDotClassName
                                        : '',
                                )}
                            ></div>
                        );
                    })}
                </div>
            )}
        </CarouselComponent>
    );
};
