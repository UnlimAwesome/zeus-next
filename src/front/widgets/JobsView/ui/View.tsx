'use client';

import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/front/shared/lib/utils';
import { HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';

import { Content } from './Content';
import { Description } from './Description';
import { DescriptionConnector } from './DescriptionConnector';
import { IconConnector } from './IconConnector';
import { IconsContainer } from './IconsContainer';

const AnimationDuration = 400;

interface ViewProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const View = (props: ViewProps) => {
    const { className, ...otherProps } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const visualsContainerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);

    const [activeJob, setActiveJob] = useState(3);
    const [iconRect, setIconRect] = useState<DOMRect>();
    const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>(
        'vertical',
    );

    useEffect(() => {
        setOrientation(window.innerWidth <= 768 ? 'vertical' : 'horizontal');
        window.addEventListener('resize', () => {
            setOrientation(
                window.innerWidth <= 768 ? 'vertical' : 'horizontal',
            );
        });
        return () => {
            window.removeEventListener('resize', () => {});
        };
    }, []);

    const connectIcon = () => {
        if (!iconRect) return {};
        const targetRect =
            visualsContainerRef.current?.getBoundingClientRect()!;

        const containerRect = containerRef.current?.getBoundingClientRect()!;
        const descriptionRect =
            descriptionRef.current?.getBoundingClientRect()!;

        const iconConnectionStart: { x: number; y: number } = {
            x:
                iconRect!.x +
                iconRect!.width / (window.innerWidth <= 768 ? 2 : 1) -
                containerRect.x,
            y:
                -containerRect.y +
                iconRect!.y +
                iconRect!.height / (window.innerWidth <= 768 ? 1 : 2),
        };

        const iconConnectionDestination: { x: number; y: number } = {
            x:
                targetRect.x +
                (window.innerWidth <= 768 ? targetRect.width / 2 : 0) -
                containerRect.x,
            y:
                -containerRect.y +
                targetRect.y +
                (window.innerWidth <= 768 ? 0 : targetRect.height / 2),
        };
        console.log(iconConnectionStart, iconConnectionDestination);

        const descriptionConnectionStart: { x: number; y: number } = {
            x:
                -containerRect.x +
                targetRect.x +
                targetRect.width / (window.innerWidth <= 768 ? 2 : 1),
            y:
                -containerRect.y +
                targetRect.y +
                targetRect.height / (window.innerWidth <= 768 ? 1 : 2),
        };

        const descriptionConnectionDestination: { x: number; y: number } = {
            x:
                -containerRect.x +
                descriptionRect.x +
                (window.innerWidth <= 768 ? descriptionRect.width / 2 : 0),
            y:
                -containerRect.y +
                descriptionRect.y +
                (window.innerWidth <= 768 ? 0 : descriptionRect.height / 2),
        };

        return {
            iconConnectionStart,
            iconConnectionDestination,
            descriptionConnectionStart,
            descriptionConnectionDestination,
            containerWidth: containerRect.width,
            containerHeight: containerRect.height,
        };
    };

    const {
        iconConnectionStart,
        iconConnectionDestination,
        descriptionConnectionStart,
        descriptionConnectionDestination,
        containerWidth,
        containerHeight,
    } = useMemo(connectIcon, [iconRect]);

    return (
        <section
            className={cn(
                'xl:h-[calc(100svh-var(--header-height))]',
                className,
            )}
            {...otherProps}
        >
            <SectionHeader>Категории работ</SectionHeader>
            <div className='h-[calc(100svh-3*var(--header-height))] bg-[var(--dark-opacity)] px-6 py-10 xl:px-[5%]'>
                <div
                    ref={containerRef}
                    className={cn(
                        'flex flex-col gap-10 md:gap-6 xl:gap-10',
                        'md:grid md:grid-cols-4',
                        'relative md:h-4/5',
                    )}
                >
                    <IconsContainer
                        setIconRect={setIconRect}
                        active={activeJob}
                        setActive={setActiveJob}
                    />
                    {iconConnectionStart && iconConnectionDestination && (
                        <IconConnector
                            from={iconConnectionStart}
                            to={iconConnectionDestination}
                            orientation={orientation}
                            animationDuration={AnimationDuration}
                            containerWidth={containerWidth}
                            containerHeight={containerHeight}
                        />
                    )}
                    <Content
                        className='col-span-2 md:h-full md:grid-cols-subgrid'
                        key={'content' + activeJob}
                        ref={visualsContainerRef}
                        animationDuration={AnimationDuration}
                        orientation={orientation}
                    >
                        <div className='size-full rounded-2xl bg-[hsl(var(--dark))]'>
                            {activeJob}
                        </div>
                    </Content>
                    {descriptionConnectionStart &&
                        descriptionConnectionDestination && (
                            <DescriptionConnector
                                key={'desc' + activeJob}
                                from={descriptionConnectionStart}
                                to={descriptionConnectionDestination}
                                animationDuration={AnimationDuration}
                                orientation={orientation}
                            />
                        )}
                    <Description
                        text='Описание категории'
                        ref={descriptionRef}
                    />
                </div>
            </div>
        </section>
    );
};
