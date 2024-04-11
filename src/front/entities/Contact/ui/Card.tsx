import { cn } from '@/front/shared/lib/utils';
import {
    CardContent,
    CardDescription,
    CardHeader,
    Card as CardPrimitive,
    CardTitle,
} from '@/components/ui/card';

interface CardProps {
    className?: string;
}

export const Card = (props: CardProps) => {
    const { className, ...otherProps } = props;
    return (
        <CardPrimitive
            className={cn(
                'border-[var(--dark-opacity)] bg-[var(--dark-opacity)] text-white',
                className,
            )}
            {...otherProps}
        >
            <CardContent className='flex size-full flex-col justify-evenly pt-6'>
                <div>
                    <CardTitle className='text-3xl text-white'>Адрес</CardTitle>
                    <CardDescription className='text-xl text-white'>
                        СПБ, улица Пушкина, дом Колотушкина
                    </CardDescription>
                </div>
                <div>
                    <CardTitle className='text-3xl text-white'>
                        Телефон:
                    </CardTitle>
                    <CardDescription className='text-xl text-white'>
                        000000000000000000
                    </CardDescription>
                </div>
                <div>
                    <CardTitle className='text-3xl text-white'>
                        Email:
                    </CardTitle>
                    <CardDescription className='text-xl text-white'>
                        000000000000000000
                    </CardDescription>
                </div>
                <div>
                    <CardTitle className='text-3xl text-white'>
                        Мы в соцсетях
                    </CardTitle>
                    <CardDescription className='text-xl text-white'>
                        000000000000000000
                    </CardDescription>
                </div>
            </CardContent>
        </CardPrimitive>
    );
};
