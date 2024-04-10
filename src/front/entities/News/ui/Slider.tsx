import { Slider as SliderPrimitive } from '@/components/Slider';
import { Card as NewsCard } from './Card';
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
            className={cn(className)}
            dotsClassName='bg-white h-2 w-8 rounded transition-all'
            activeDotClassName='bg-[hsl(var(--contrast))] h-2 w-20'
            autoplayDelay={6000}
            height={height}
        >
            <NewsCard
                className={height}
                title='Продвижение компании'
                description='В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.'
            ></NewsCard>
            <NewsCard
                className={height}
                title='Продвижение компании'
                description='В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.'
            ></NewsCard>
            <NewsCard
                className={height}
                title='Продвижение компании'
                description='В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.'
            ></NewsCard>
            <NewsCard
                className={height}
                title='Продвижение компании'
                description='В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.'
            ></NewsCard>
        </SliderPrimitive>
    );
};
