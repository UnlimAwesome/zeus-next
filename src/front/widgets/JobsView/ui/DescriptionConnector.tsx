import { cn } from '@/front/shared/lib/utils';
import { useId } from 'react';

interface DescriptionConnectorProps {
    className?: string;
    orientation: 'vertical' | 'horizontal';
    from: { x: number; y: number };
    to: { x: number; y: number };
    animationDuration: number;
}

export const DescriptionConnector = (props: DescriptionConnectorProps) => {
    const {
        className,
        from: start,
        to: destination,
        orientation,
        animationDuration,
        ...otherProps
    } = props;

    const id = useId().replaceAll(':', '');
    const width = Math.abs(start.x - destination.x);

    const height = Math.abs(start.y - destination.y);
    return (
        <>
            <style>{`
            @keyframes width-increase-${id} {
                from {
                    width: 0;
                }
                to {
                    width: ${width}px;
                }
            }

            @keyframes height-increase-${id} {
                from {
                    height: 0;
                }
                to {
                    height: ${height}px;
                }
            }
        `}</style>
            <div
                className={cn(
                    'absolute bg-[var(--dark-contrast)]',
                    orientation === 'vertical' ? 'w-1 md:w-2' : 'h-1 md:h-2',
                    className,
                )}
                style={{
                    top: orientation === 'vertical' ? start.y : start.y - 4,
                    left: start.x,
                    animationDuration: `${animationDuration}ms`,
                    animationName:
                        orientation === 'horizontal'
                            ? `width-increase-${id}`
                            : `height-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationFillMode: 'forwards',
                    animationDelay: `${animationDuration}ms`,
                }}
                {...otherProps}
            ></div>
        </>
    );
};
