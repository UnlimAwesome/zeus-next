'use client';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { cn } from '@/front/shared/lib/utils';
import { forwardRef } from 'react';

interface DescriptionProps {
    className?: string;
    fontSize?: string;
    text: string;
    orientation?: 'vertical' | 'horizontal';
}

export const Description = forwardRef<HTMLDivElement, DescriptionProps>(
    function Description(props: DescriptionProps, ref) {
        const { className, fontSize, text, ...otherProps } = props;
        return (
            <Card
                ref={ref}
                className={cn(
                    'rounded-2xl border-[var(--dark-opacity)] bg-[var(--dark-opacity)]',
                    className,
                )}
                {...otherProps}
            >
                <CardContent className='size-full p-2'>
                    <CardDescription
                        className={cn(
                            'flex size-full items-center justify-center text-center text-2xl text-white',
                            fontSize,
                        )}
                    >
                        {text}
                    </CardDescription>
                </CardContent>
            </Card>
        );
    },
);
