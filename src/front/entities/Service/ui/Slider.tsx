import { Slider as SliderPrimitive } from '@/components/Slider';
import { Card as ServiceCard } from './Card';
import { cn } from '@/utils';
import { ClassValue } from 'clsx';

const cards = [
    {
        title: 'Облачные вычисления',
        description:
            'Мы используем передовые облачные технологии для создания гибких и масштабируемых IT-платформ, обеспечивая вам доступ к данным и ресурсам в любое время и из любой точки мира.',
        img: {
            src: 'https://fraufluger.ru/wp-content/uploads/2021/02/full_wnb8deop.jpg',
            alt: 'Облачные вычисления',
        },
    },
    {
        title: 'Интернет вещей (IoT)',
        description:
            'Наши решения в области IoT позволяют вам управлять и контролировать различные устройства и системы в реальном времени, открывая новые возможности в области автоматизации и оптимизации.',
        img: {
            src: 'https://fraufluger.ru/wp-content/uploads/2021/02/full_wnb8deop.jpg',
            alt: 'Интернет вещей (IoT)',
        },
    },
    {
        title: 'Искусственный интеллект и машинное обучение',
        description:
            'Мы применяем передовые методы для анализа данных и прогнозирования тенденций, помогая вам принимать более обоснованные и эффективные бизнес-решения.',
        img: {
            src: 'https://fraufluger.ru/wp-content/uploads/2021/02/full_wnb8deop.jpg',
            alt: 'Искусственный интеллект и машинное обучение',
        },
    },
    {
        title: 'Опытная команда',
        description:
            'Компания состоит из высококвалифицированных IT-специалистов, готовых решать самые сложные задачи и обеспечивать высокое качество услуг.',
        img: {
            src: 'https://fraufluger.ru/wp-content/uploads/2021/02/full_wnb8deop.jpg',
            alt: 'Опытная команда',
        },
    },
    {
        title: 'Индивидуальный подход',
        description:
            'Мы придаем большое значение индивидуальному подходу к каждому клиенту, стремясь полностью понять их потребности и предложить наилучшие решения.',
        img: {
            src: 'https://fraufluger.ru/wp-content/uploads/2021/02/full_wnb8deop.jpg',
            alt: 'Индивидуальный подход',
        },
    },
    {
        title: 'Инновационные решения',
        description:
            'Мы всегда следим за последними технологическими трендами и стремимся применять самые инновационные и передовые решения для достижения оптимальных результатов для наших клиентов.',
        img: {
            src: 'https://fraufluger.ru/wp-content/uploads/2021/02/full_wnb8deop.jpg',
            alt: 'Инновационные решения',
        },
    },
];

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
            {cards.map((card, index) => (
                <ServiceCard
                    key={index}
                    height={'h-full'}
                    width={width}
                    img={card.img}
                    title={card.title}
                    description={card.description}
                />
            ))}
        </SliderPrimitive>
    );
};
