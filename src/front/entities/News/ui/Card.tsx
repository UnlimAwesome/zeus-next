import {
    CardContent,
    CardDescription,
    Card as CardPrimitive,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/front/shared/lib/utils';

interface CardProps {
    title: string;
    description: string;
    className?: string;
    height?: string;
    width?: string;
}

export const Card = (props: CardProps) => {
    const { className, title, description, height, width, ...otherProps } =
        props;
    return (
        <CardPrimitive
            className={cn(
                'overflow-hidden rounded-2xl border-[var(--dark-opacity)] bg-[var(--dark-opacity)] text-white',
                className,
                height,
                width,
            )}
            {...otherProps}
        >
            <CardContent className=''>
                <CardTitle className='mt-6 w-full text-center text-2xl font-medium md:text-4xl xl:text-6xl'>
                    {title}
                </CardTitle>
                <CardDescription className='mt-6 w-full text-center text-xl text-white md:text-3xl'>
                    {description}
                </CardDescription>
            </CardContent>
        </CardPrimitive>
    );
};
