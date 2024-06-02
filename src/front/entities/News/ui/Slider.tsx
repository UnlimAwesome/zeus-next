import { PostData } from '@/back/Dashboard/Post/model';
import { Slider as SliderPrimitive } from '@/components/Slider';
import { cn } from '@/utils';
import { ClassValue } from 'clsx';
import { Card as NewsCard } from './Card';

interface SliderProps {
    className?: string;
    height?: ClassValue;
    width?: string;
    posts: PostData[];
}

export const Slider = async (props: SliderProps) => {
    const { className, height, posts, width, ...otherProps } = props;
    return (
        <SliderPrimitive
            className={cn(className)}
            dotsClassName='bg-white h-2 w-8 rounded transition-all'
            activeDotClassName='bg-[hsl(var(--contrast))] h-2 w-20'
            autoplayDelay={6000}
            height={height}
        >
            {posts.map((post) => (
                <NewsCard
                    key={post.id}
                    className={height}
                    title={post.title + ' ' + post.id}
                    description={post.description}
                ></NewsCard>
            ))}
        </SliderPrimitive>
    );
};
