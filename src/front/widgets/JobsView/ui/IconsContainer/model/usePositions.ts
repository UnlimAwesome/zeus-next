'use client';
import { useEffect, useRef, useState } from 'react';

export function usePositions() {
    const [initPositions, setInitPositions] =
        useState<{ top: number; left: number }[]>();
    const containerRef = useRef<HTMLDivElement>(null);

    const calcPositions = () => {
        if (window.innerWidth < 768 || !containerRef.current) return;
        const containerRect = containerRef.current.getBoundingClientRect();
        const gapCol1 = (containerRect.height - 3 * 96) / 4;
        const gapCol2 = (containerRect.height - 2 * 96 - gapCol1) / 2;
        const gapRow = (containerRect.width - 2 * 96) / 3;

        return [
            { top: gapCol1, left: gapRow },
            { top: 2 * gapCol1 + 96, left: gapRow },
            { top: 3 * gapCol1 + 2 * 96, left: gapRow },

            { top: gapCol2, left: 2 * gapRow + 96 },
            { top: gapCol2 + 96 + gapCol1, left: 2 * gapRow + 96 },
        ];
    };

    useEffect(() => {
        setInitPositions(calcPositions());
        window.addEventListener('resize', () => {
            setInitPositions(calcPositions());
        });
        return () => {
            window.removeEventListener('resize', () => {});
        };
    }, []);
    return { containerRef, initPositions };
}
