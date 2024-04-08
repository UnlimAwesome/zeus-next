import { Slider as SliderPrimitive } from '@/components/Slider';
import { Card as NewsCard } from './Card';
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
            className={cn(className, height, width)}
            dotsClassName='bg-white h-2 w-8 rounded transition-all'
            activeDotClassName='bg-[hsl(var(--contrast))] h-2 w-20'
            autoplayDelay={6000}
        >
            <NewsCard
                height={height}
                title='Продвижение компании'
                description='В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.'
            ></NewsCard>
            <NewsCard
                height={height}
                title='Продвижение компании'
                description='В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.'
            ></NewsCard>
            <NewsCard
                height={height}
                title='Продвижение компании'
                description='В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.'
            ></NewsCard>
            <NewsCard
                height={height}
                title='Продвижение компании'
                description='В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.'
            ></NewsCard>
        </SliderPrimitive>
    );
};
