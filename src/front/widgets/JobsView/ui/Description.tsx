'use client';
import { Card, CardContent, CardDescription } from '@/components/ui/card';
import { cn } from '@/front/shared/lib/utils';
import { forwardRef } from 'react';
import { TypeAnimation } from 'react-type-animation';

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
                            'flex size-full items-center justify-center text-center text-lg text-white md:text-2xl',
                            fontSize,
                        )}
                    >
                        <TypeAnimation
                            sequence={[text]}
                            speed={89}
                            cursor={false}
                            wrapper='span'
                            style={{ height: 'max-content' }}
                        />
                    </CardDescription>
                </CardContent>
            </Card>
        );
    },
);
