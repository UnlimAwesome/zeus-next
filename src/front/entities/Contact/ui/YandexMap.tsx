import { cn } from '@/front/shared/lib/utils';
import { HTMLAttributes } from 'react';

interface YandexMapProps extends HTMLAttributes<HTMLDivElement> {
    className?: string;
}

export const YandexMap = (props: YandexMapProps) => {
    const { className, ...otherProps } = props;
    return (
        <div
            className={cn('relative', className)}
            {...otherProps}
        >
            <iframe
                src='https://yandex.ru/map-widget/v1/?um=constructor%3A5d930736c9cbf235d7e75b82d77ab1c4c6780ffec80f749c3690d975e81f1b65&amp;source=constructor'
                className='absolute inset-0 h-full w-full'
                frameBorder='0'
            ></iframe>
        </div>
    );
};
