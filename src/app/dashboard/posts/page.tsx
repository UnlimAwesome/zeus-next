import {
    Card,
    CardContent,
    CardDescription,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/front/shared/lib/utils';

const postsMock = [
    {
        header: 'Продвижение компании',
        text: 'В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.',
    },
    {
        header: 'Продвижение компании',
        text: 'В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.',
    },
    {
        header: 'Продвижение компании',
        text: 'В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.',
    },
    {
        header: 'Продвижение компании',
        text: 'В этом блоке будут отображаться общие новости компании такие как разработка и внедрение нового оборудования, взаимодействие с другими организациями и т.д.',
    },
];

export default function Posts() {
    return (
        <div className={cn('m-4 flex flex-wrap gap-4')}>
            {postsMock.map((post, index) => (
                <Card
                    key={index}
                    className={cn(
                        'max-w-[24%] shrink grow basis-1/4 overflow-hidden rounded-2xl border-[var(--dark-opacity)] bg-[var(--dark-opacity)] text-white',
                    )}
                >
                    <CardContent className=''>
                        <CardTitle className='mt-6 w-full text-center text-2xl font-medium'>
                            {post.header}
                        </CardTitle>
                        <CardDescription className='mt-6 w-full text-center text-xl text-white'>
                            {post.text}
                        </CardDescription>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
