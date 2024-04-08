import { useId } from 'react';

interface IconConnectorProps {
    orientation: 'vertical' | 'horizontal';
    from: { x: number; y: number };
    to: { x: number; y: number };
    animationDuration: number;
    className?: string;
    containerWidth: number;
    containerHeight: number;
}

export const IconConnector = (props: IconConnectorProps) => {
    const {
        className,
        from: start,
        to: destination,
        animationDuration,
        containerWidth,
        containerHeight,
        orientation,
        ...otherProps
    } = props;
    const id = useId().replaceAll(':', '');
    console.log(id);

    const width =
        orientation === 'vertical'
            ? Math.abs(start.x - destination.x) === 0
                ? 0
                : Math.abs(start.x - destination.x) + 2
            : Math.abs(start.x - destination.x) / 2;

    const height =
        orientation === 'vertical'
            ? Math.abs(start.y - destination.y) / 2 + 2
            : Math.abs(start.y - destination.y) <= 0.1
              ? 0
              : Math.abs(start.y - destination.y) + 8;

    console.log(width, height);
    return (
        <>
            <style>{`
            @keyframes width-increase-${id} {
                from {
                    width: 0;
                }
                to {
                    width: ${orientation === 'vertical' ? width : 2 * width - 26}px;
                }
            }
            ${
                orientation === 'horizontal'
                    ? `@keyframes width-2-increase-${id} {
                from {
                    width: 0;
                }
                to {
                    width: ${30}px;
                }
            }`
                    : ''
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
                key={Math.random()}
                style={{
                    width: orientation === 'vertical' ? '4px' : '0',
                    backgroundColor: 'hsl(var(--contrast))',
                    height: orientation === 'vertical' ? '0' : '8px',
                    top: `${start.y}px`,
                    left: `${start.x}px`,
                    position: 'absolute',
                    transformOrigin: 'top',
                    animationName:
                        orientation === 'vertical'
                            ? `height-increase-${id}`
                            : `width-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationDuration:
                        orientation === 'vertical'
                            ? (height / (2 * height + width)) *
                                  animationDuration +
                              'ms'
                            : ((2 * width - 26) / (height + 2 * width)) *
                                  animationDuration +
                              'ms',
                    animationFillMode: 'forwards',
                }}
            ></div>
            <div
                key={Math.random()}
                style={{
                    height: orientation === 'vertical' ? '4px' : '0',
                    backgroundColor: 'hsl(var(--contrast))',
                    width: orientation === 'vertical' ? '0' : '8px',
                    top:
                        orientation === 'vertical'
                            ? `${start.y + (destination.y - start.y) / 2}px`
                            : start.y <= destination.y
                              ? `${start.y}px`
                              : 'unset',
                    left:
                        orientation === 'vertical'
                            ? `${start.x < destination.x ? Math.min(start.x, destination.x) + 'px' : 'unset'}`
                            : `${start.x + 2 * width - 30}px`,
                    right: `${start.x > destination.x ? containerWidth - start.x - 4 + 'px' : 'unset'}`,
                    bottom: `${start.y > destination.y ? containerHeight - start.y - 8 + 'px' : 'unset'}`,
                    position: 'absolute',
                    transformOrigin:
                        orientation === 'vertical'
                            ? start.x <= destination.x
                                ? 'left'
                                : 'right'
                            : start.y <= destination.y
                              ? 'top'
                              : 'bottom',
                    animationName:
                        orientation === 'vertical'
                            ? `width-increase-${id}`
                            : `height-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationDuration:
                        orientation === 'vertical'
                            ? (width / (2 * height + width)) *
                                  animationDuration +
                              'ms'
                            : (height / (height + 2 * width)) *
                                  animationDuration +
                              'ms',
                    animationFillMode: 'forwards',
                    animationDelay:
                        orientation === 'vertical'
                            ? (height / (2 * height + width)) *
                                  animationDuration +
                              'ms'
                            : ((2 * width - 26) / (height + 2 * width)) *
                                  animationDuration +
                              'ms',
                }}
            ></div>
            <div
                key={Math.random()}
                style={{
                    width: orientation === 'vertical' ? '4px' : '0',
                    backgroundColor: 'hsl(var(--contrast))',
                    height: orientation === 'vertical' ? '0' : '8px',
                    top:
                        orientation === 'vertical'
                            ? `${start.y + Math.abs(start.y - destination.y) / 2}px`
                            : `${destination.y}px`,
                    left:
                        orientation === 'vertical'
                            ? `${destination.x}px`
                            : `${destination.x - 30}px`,
                    position: 'absolute',
                    transformOrigin: 'top',
                    animationName:
                        orientation === 'vertical'
                            ? `height-increase-${id}`
                            : `width-2-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationDuration:
                        orientation === 'vertical'
                            ? (height / (2 * height + width)) *
                                  animationDuration +
                              'ms'
                            : (30 / (height + 2 * width)) * animationDuration +
                              'ms',
                    animationFillMode: 'forwards',
                    animationDelay:
                        orientation === 'vertical'
                            ? ((height + width) / (2 * height + width)) *
                                  animationDuration +
                              'ms'
                            : ((2 * width - 26 + height) /
                                  (height + 2 * width)) *
                                  animationDuration +
                              'ms',
                }}
            ></div>
        </>
    );
};
