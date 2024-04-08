import { cn } from '@/front/shared/lib/utils';
import { HTMLAttributes, Ref, forwardRef } from 'react';

interface ContentProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
    orientation: 'vertical' | 'horizontal';
    animationDuration: number;
}

export const Content = forwardRef<HTMLDivElement, ContentProps>(
    function Content(props: ContentProps, ref: Ref<HTMLDivElement>) {
        const {
            className,
            orientation,
            animationDuration,
            children,
            ...otherProps
        } = props;
        return (
            <>
                <style>{`@keyframes bg-gradient {
                        from {
                            background-position: ${orientation === 'horizontal' ? 'left' : 'bottom'};
                        }
                        to {
                            background-position: ${orientation === 'horizontal' ? 'right' : 'top'};
                        }
                    }`}</style>
                <div
                    ref={ref}
                    className={cn(
                        'h-96 w-full rounded-2xl p-1 md:p-2 ' + className,
                    )}
                    style={{
                        backgroundImage: `linear-gradient(to ${orientation === 'horizontal' ? 'right' : 'bottom'}, hsl(var(--contrast)),  var(--dark-contrast) ${orientation === 'horizontal' ? '90%' : '40%'})`,
                        backgroundSize:
                            orientation === 'horizontal'
                                ? '200% 100%'
                                : '100% 200%',
                        backgroundPosition: 'bottom',
                        animationName: 'bg-gradient',
                        animationTimingFunction: 'linear',
                        animationFillMode: 'forwards',
                        animationDuration: animationDuration + 'ms',
                        animationDelay: animationDuration + 'ms',
                    }}
                >
                    {children}
                </div>
            </>
        );
    },
);
