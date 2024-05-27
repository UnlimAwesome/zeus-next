'use client';

import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/front/shared/lib/utils';
import { HTMLAttributes, useEffect, useMemo, useRef, useState } from 'react';

import { Content } from './Content';
import { Description } from './Description';
import { DescriptionConnector } from './DescriptionConnector';
import { IconConnector } from './IconConnector';
import { IconsContainer } from './IconsContainer';
import { TypeAnimation } from 'react-type-animation';

const AnimationDuration = 400;

const jobs = [
    {
        title: 'Обработка, анализ, эффективное представление информации, контента и знаний',
        description:
            'Мы создаем инструменты и приложения для эффективной обработки массивов данных, извлекая ценную информацию из разнообразных источников и преобразовывать ее в знания, которые помогают нашим клиентам достичь своих бизнес-целей.',
    },
    {
        title: 'Облачные технологии и технологии виртуализации',
        description:
            'Наши специалисты имеют глубокие знания в области облачных технологий и виртуализации, что позволяет нам предлагать нашим клиентам гибкие и масштабируемые решения для хранения данных, развертывания приложений и оптимизации IT-инфраструктуры.',
    },
    {
        title: 'Новые человеко-машинные интерфейсы и когнитивные технологии',
        description:
            'Мы разрабатываем инновационные человеко-машинные интерфейсы, которые позволяют пользователям взаимодействовать с системами более естественным и удобным способом. Кроме того, мы исследуем и применяем когнитивные технологии, такие как распознавание речи, обработка естественного языка и компьютерное зрение, для улучшения процессов принятия решений и повышения производительности.',
    },
    {
        title: 'Алгоритмика и моделирование',
        description:
            'Наша команда специалистов создает и интегрирует математические модели в алгоритмы для решения широкого спектра задач, начиная от анализа данных до оптимизации производственных процессов. ',
    },
    {
        title: 'Платформы информационной безопасности на основе технологии AI в интеграции с IoT и IIoT',
        description:
            'Мы создаем инновационные платформы информационной безопасности, интегрирующие технологии искусственного интеллекта (AI) с системами Интернета вещей (IoT) и промышленного Интернета вещей (IIoT), для обеспечения комплексной защиты информации и инфраструктуры.',
    },
    {
        title: 'Интеллектуальные системы управления',
        description:
            'Мы стремимся к постоянному совершенствованию наших систем управления, внедряя новые технологии и методики, чтобы обеспечить нашим клиентам конкурентные преимущества и повысить их эффективность.',
    },
    {
        title: 'Инсталляция систем "Умной среды обитания"',
        description:
            'Мы интегрируем удобное, безопасное и энергоэффективное пространство для жизни и работы наших клиентов, обеспечивая им максимальный комфорт и удовлетворение от использования технологий "Умной среды обитания".',
    },
];

interface ViewProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const View = (props: ViewProps) => {
    const { className, ...otherProps } = props;

    const containerRef = useRef<HTMLDivElement>(null);
    const visualsContainerRef = useRef<HTMLDivElement>(null);
    const descriptionRef = useRef<HTMLDivElement>(null);
    const [iconsContainerRect, setIconContainerRect] = useState<
        DOMRect | undefined
    >();

    const [activeJob, setActiveJob] = useState(3);
    const [iconRect, setIconRect] = useState<DOMRect>();
    const [orientation, setOrientation] = useState<'vertical' | 'horizontal'>(
        'vertical',
    );

    useEffect(() => {
        setOrientation(window.innerWidth < 768 ? 'vertical' : 'horizontal');
        window.addEventListener('resize', () => {
            setOrientation(window.innerWidth < 768 ? 'vertical' : 'horizontal');
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
                iconRect!.width / (window.innerWidth < 768 ? 2 : 1) -
                containerRect.x,
            y:
                -containerRect.y +
                iconRect!.y +
                iconRect!.height / (window.innerWidth < 768 ? 1 : 2),
        };

        const iconConnectionDestination: { x: number; y: number } = {
            x:
                targetRect.x +
                (window.innerWidth < 768 ? targetRect.width / 2 : 0) -
                containerRect.x,
            y:
                -containerRect.y +
                targetRect.y +
                (window.innerWidth < 768 ? 0 : targetRect.height / 2),
        };

        const descriptionConnectionStart: { x: number; y: number } = {
            x:
                -containerRect.x +
                targetRect.x +
                targetRect.width / (window.innerWidth < 768 ? 2 : 1),
            y:
                -containerRect.y +
                targetRect.y +
                targetRect.height / (window.innerWidth < 768 ? 1 : 2),
        };

        const descriptionConnectionDestination: { x: number; y: number } = {
            x:
                -containerRect.x +
                descriptionRect.x +
                (window.innerWidth < 768 ? descriptionRect.width / 2 : 0),
            y:
                -containerRect.y +
                descriptionRect.y +
                (window.innerWidth < 768 ? 0 : descriptionRect.height / 2),
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
            <div className='bg-[var(--dark-opacity)] px-6 py-10 md:h-[calc(100svh-3*var(--header-height))] md:px-[5%]'>
                <div
                    ref={containerRef}
                    className={cn(
                        'flex flex-col gap-10 md:gap-6 xl:gap-10',
                        'md:flex-row',
                        'lg:grid lg:grid-cols-4',
                        'relative md:h-full',
                    )}
                >
                    <IconsContainer
                        setIconRect={setIconRect}
                        active={activeJob}
                        setActive={setActiveJob}
                        setIconContainerRect={setIconContainerRect}
                    />
                    {iconConnectionStart && iconConnectionDestination && (
                        <IconConnector
                            from={iconConnectionStart}
                            to={iconConnectionDestination}
                            orientation={orientation}
                            animationDuration={AnimationDuration}
                            containerWidth={containerWidth}
                            containerHeight={containerHeight}
                            iconContainerRect={iconsContainerRect}
                        />
                    )}
                    <Content
                        className='col-span-2 md:h-full md:w-auto md:shrink-0 md:grow-[2] md:basis-1/2 lg:grid-cols-subgrid'
                        key={'content' + activeJob}
                        ref={visualsContainerRef}
                        animationDuration={AnimationDuration}
                        orientation={orientation}
                    >
                        <div className='size-full rounded-2xl bg-[hsl(var(--dark))]'>
                            <p className='text-center text-xl font-medium text-white md:text-3xl'>
                                <TypeAnimation
                                    sequence={[jobs[activeJob].title]}
                                    wrapper='span'
                                    cursor={false}
                                    style={{ height: 'max-content' }}
                                />
                            </p>
                        </div>
                    </Content>
                    {descriptionConnectionStart &&
                        descriptionConnectionDestination && (
                            <DescriptionConnector
                                key={'desc-connector' + activeJob}
                                from={descriptionConnectionStart}
                                to={descriptionConnectionDestination}
                                animationDuration={AnimationDuration}
                                orientation={orientation}
                            />
                        )}
                    <Description
                        key={'desc' + activeJob}
                        className='md:grow'
                        text={jobs[activeJob].description}
                        ref={descriptionRef}
                    />
                </div>
            </div>
        </section>
    );
};
