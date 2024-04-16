import { useEffect, useId } from 'react';

interface IconConnectorProps {
    orientation: 'vertical' | 'horizontal';
    from: { x: number; y: number };
    to: { x: number; y: number };
    animationDuration: number;
    containerWidth: number;
    containerHeight: number;
    iconContainerRect?: DOMRect;
}

export const IconConnectorVertical = (
    props: Omit<IconConnectorProps, 'orientation' | 'iconContainerRect'>,
) => {
    const {
        from: start,
        to: destination,
        animationDuration,
        containerWidth,
        containerHeight,
    } = props;
    const id = useId().replaceAll(':', '');

    const width =
        Math.abs(start.x - destination.x) === 0
            ? 0
            : Math.abs(start.x - destination.x) + 2;

    const height = Math.abs(start.y - destination.y) / 2 + 2;

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
                key={Math.random()}
                style={{
                    width: 4,
                    backgroundColor: 'hsl(var(--contrast))',
                    height: 0,
                    top: `${start.y}px`,
                    left: `${start.x}px`,
                    position: 'absolute',
                    transformOrigin: 'top',
                    animationName: `height-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationDuration:
                        (height / (2 * height + width)) * animationDuration +
                        'ms',
                    animationFillMode: 'forwards',
                }}
            ></div>
            <div
                key={Math.random()}
                style={{
                    height: 4,
                    backgroundColor: 'hsl(var(--contrast))',
                    width: 0,
                    top: `${start.y + (destination.y - start.y) / 2}px`,
                    left: `${start.x < destination.x ? Math.min(start.x, destination.x) + 'px' : 'unset'}`,
                    right: `${start.x > destination.x ? containerWidth - start.x - 4 + 'px' : 'unset'}`,
                    bottom: `${start.y > destination.y ? containerHeight - start.y - 8 + 'px' : 'unset'}`,
                    position: 'absolute',
                    transformOrigin:
                        start.x <= destination.x ? 'left' : 'right',
                    animationName: `width-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationDuration:
                        (width / (2 * height + width)) * animationDuration +
                        'ms',
                    animationFillMode: 'forwards',
                    animationDelay:
                        (height / (2 * height + width)) * animationDuration +
                        'ms',
                }}
            ></div>
            <div
                key={Math.random()}
                style={{
                    width: 4,
                    backgroundColor: 'hsl(var(--contrast))',
                    height: 0,
                    top: `${start.y + Math.abs(start.y - destination.y) / 2}px`,
                    left: `${destination.x}px`,
                    position: 'absolute',
                    transformOrigin: 'top',
                    animationName: `height-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationDuration:
                        (height / (2 * height + width)) * animationDuration +
                        'ms',
                    animationFillMode: 'forwards',
                    animationDelay:
                        ((height + width) / (2 * height + width)) *
                            animationDuration +
                        'ms',
                }}
            ></div>
        </>
    );
};

export const IconConnectorHorizontal = (
    props: Omit<IconConnectorProps, 'orientation'>,
) => {
    const {
        from: start,
        to: destination,
        animationDuration,
        containerWidth,
        containerHeight,
        iconContainerRect,
    } = props;
    const id = useId().replaceAll(':', '');

    const lineWidth = 8;
    const offset = lineWidth / 2;

    const width = Math.abs(start.x - destination.x);
    const width2 =
        iconContainerRect!.width > 80
            ? (destination.x -
                  iconContainerRect!.width +
                  (iconContainerRect!.width - 2 * 96) / 3) /
              2
            : (destination.x - iconContainerRect!.width) / 2;
    const height = Math.abs(start.y - destination.y);

    return (
        <>
            <style>{`
            @keyframes width-increase-${id} {
                from {
                    width: 0;
                }
                to {
                    width: ${width - width2}px;
                }
            }
            @keyframes width-2-increase-${id} {
                from {
                    width: 0;
                }
                to {
                    width: ${width2 + offset}px;
                }
            }

            @keyframes height-increase-${id} {
                from {
                    height: 0;
                }
                to {
                    height: ${height + offset}px;
                }
            }
        `}</style>
            <div
                key={Math.random()}
                style={{
                    width: 0,
                    backgroundColor: 'hsl(var(--contrast))',
                    height: 8,
                    top: `${start.y - offset}px`,
                    left: `${start.x}px`,
                    position: 'absolute',
                    transformOrigin: 'top',
                    animationName: `width-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationDuration:
                        ((width - width2) / (height + width)) *
                            animationDuration +
                        'ms',
                    animationFillMode: 'forwards',
                }}
            ></div>
            <div
                key={Math.random()}
                style={{
                    height: 0,
                    backgroundColor: 'hsl(var(--contrast))',
                    width: 8,
                    top:
                        start.y <= destination.y
                            ? `${start.y - offset}px`
                            : 'unset',
                    left: `${start.x + width - width2 - offset}px`,
                    right: `${start.x > destination.x ? containerWidth - start.x - offset + 'px' : 'unset'}`,
                    bottom: `${start.y > destination.y ? containerHeight - start.y - offset + 'px' : 'unset'}`,
                    position: 'absolute',
                    transformOrigin:
                        start.y <= destination.y ? 'top' : 'bottom',
                    animationName: `height-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationDuration:
                        (height / (height + width)) * animationDuration + 'ms',
                    animationFillMode: 'forwards',
                    animationDelay:
                        ((width - width2) / (height + width)) *
                            animationDuration +
                        'ms',
                }}
            ></div>
            <div
                key={Math.random()}
                style={{
                    width: 0,
                    backgroundColor: 'hsl(var(--contrast))',
                    height: 8,
                    top: `${destination.y - offset}px`,
                    left: `${destination.x - width2 - offset}px`,
                    position: 'absolute',
                    transformOrigin: 'top',
                    animationName: `width-2-increase-${id}`,
                    animationTimingFunction: 'linear',
                    animationDuration:
                        (width2 / (height + width)) * animationDuration + 'ms',
                    animationFillMode: 'forwards',
                    animationDelay:
                        ((width - width2 + height) / (height + width)) *
                            animationDuration +
                        'ms',
                }}
            ></div>
        </>
    );
};

export const IconConnector = (props: IconConnectorProps) => {
    const { orientation, iconContainerRect, ...otherProps } = props;

    if (orientation === 'horizontal') {
        return iconContainerRect ? (
            <IconConnectorHorizontal
                {...otherProps}
                iconContainerRect={iconContainerRect}
            />
        ) : (
            <></>
        );
    } else {
        return <IconConnectorVertical {...otherProps} />;
    }
};
