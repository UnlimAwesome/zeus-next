'use client';
import {
    CarouselApi,
    Carousel as CarouselComponent,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    CarouselProps,
} from '@/components/ui/carousel';
import { cn } from '@/front/shared/lib/utils';
import { ClassValue } from 'clsx';
import Autoplay from 'embla-carousel-autoplay';
import { ReactNode, useEffect, useRef, useState } from 'react';

interface SwiperProps extends CarouselProps {
    className?: string;
    dotsClassName?: string;
    activeDotClassName?: string;
    autoplayDelay?: number;
    navigation?: boolean;
    children: ReactNode[];
    height?: ClassValue;
    carouselItemClassName?: ClassValue;
    gap?: number;
}

export const Carousel = (props: SwiperProps) => {
    const {
        className,
        height,
        children,
        dotsClassName,
        activeDotClassName,
        carouselItemClassName,
        autoplayDelay,
        navigation,
        gap,
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
        setCountSlides(api.scrollSnapList().length);
        api.on('select', () => {
            setCurrentSlide(api.selectedScrollSnap());
        });
        api.on('resize', () => {
            setCurrentSlide(api.selectedScrollSnap());
            setCountSlides(api.scrollSnapList().length);
        });
    }, [api]);

    return (
        <CarouselComponent
            setApi={setApi}
            plugins={autoplayDelay ? [autoplay.current] : []}
            className={cn(className)}
            onMouseEnter={autoplayDelay ? autoplay.current.stop : undefined}
            onMouseLeave={autoplayDelay ? autoplay.current.play : undefined}
            opts={{ slidesToScroll: 1, align: 'start' }}
            {...otherProps}
        >
            <CarouselContent
                className={cn('size-full', `md:-ml-[${gap || 2}px]`)}
            >
                {children.map((child, index) => (
                    <CarouselItem
                        key={index}
                        className={cn(
                            'select-none',
                            carouselItemClassName,
                            height,
                            `md:pl-[${gap || 2}px]`,
                        )}
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
