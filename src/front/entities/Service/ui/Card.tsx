import {
    CardContent,
    CardDescription,
    Card as CardPrimitive,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/front/shared/lib/utils';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';

interface CardProps {
    img: { src: string | StaticImport; alt: string };
    title: string;
    description: string;
    className?: string;
    height?: string;
    width?: string;
}

export const Card = (props: CardProps) => {
    const { className, img, title, description, height, width, ...otherProps } =
        props;
    return (
        <CardPrimitive
            className={cn(
                'overflow-hidden rounded-2xl border-black bg-black text-white',
                className,
                height,
                width,
            )}
            {...otherProps}
        >
            <Image
                src={img.src}
                alt={img.alt}
                width={600}
                height={300}
                className='h-2/3 w-full object-cover'
            />
            <CardContent className='h-1/3 sm:max-xl:h-1/2'>
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
