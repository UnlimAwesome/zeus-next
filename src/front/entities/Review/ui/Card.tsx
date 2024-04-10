import {
    CardContent,
    CardDescription,
    Card as CardPrimitive,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/front/shared/lib/utils';
import Image from 'next/image';

interface CardProps {
    image: { src: string; alt: string };
    description: string;
    className?: string;
    height?: string;
    width?: string;
}

export const Card = (props: CardProps) => {
    const { className, image, description, height, width, ...otherProps } =
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
                <CardTitle className='mt-6 flex w-full items-center justify-center'>
                    <Image
                        src={image.src}
                        alt={image.alt}
                        width={400}
                        height={400}
                        className='size-40 rounded-full object-cover'
                    />
                </CardTitle>
                <CardDescription className='mt-6 w-full text-center text-xl text-white md:text-3xl'>
                    {description}
                </CardDescription>
            </CardContent>
        </CardPrimitive>
    );
};
