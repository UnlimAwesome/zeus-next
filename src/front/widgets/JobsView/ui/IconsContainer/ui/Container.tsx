'use client';
import { cn } from '@/utils';
import { HTMLAttributes, useEffect, useRef } from 'react';
import { usePositions } from '../model/usePositions';

const icons = [1, 2, 3, 4, 5];

interface IIconsContainerProps
    extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    active: number;
    setActive: (i: number) => void;
    setIconRect: (rect: DOMRect) => void;
}
export const Container = (props: IIconsContainerProps) => {
    const { active, setActive, setIconRect, ...otherProps } = props;
    const iconRef = useRef<HTMLDivElement>(null);
    const { containerRef, initPositions } = usePositions();

    useEffect(() => {
        const timeout = setTimeout(() => {
            window.addEventListener('resize', () => {
                setIconRect(iconRef.current?.getBoundingClientRect()!);
            });
            iconRef.current?.click();
        }, 200);
        return () => {
            clearTimeout(timeout);
            window.removeEventListener('resize', () => {});
        };
    }, []);

    return (
        <div
            ref={containerRef}
            className='flex h-min w-full justify-between md:relative md:h-full'
            {...otherProps}
        >
            {icons.map((icon, i) => (
                <div
                    onClick={(e) => {
                        setIconRect(e.currentTarget.getBoundingClientRect());
                        setActive(i);
                    }}
                    key={i}
                    ref={i === active ? iconRef : null}
                    className={cn(
                        'size-16 grow-0 rounded border-4 border-white transition-colors md:absolute md:size-24 md:border-8',
                        active === i ? 'border-[hsl(var(--contrast))]' : '',
                    )}
                    style={initPositions?.[i]}
                >
                    {icon}
                </div>
            ))}
        </div>
    );
};
