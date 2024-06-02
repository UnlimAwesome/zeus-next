import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardTitle,
} from '@/components/ui/card';
import { cn } from '@/front/shared/lib/utils';
import { deletePost } from '../api/deletePost';
import { getPosts } from '../api/getPosts';

export async function Page() {
    const posts = await getPosts();
    return (
        <div className={cn('m-4 flex flex-wrap gap-4')}>
            {posts.map((post, index) => (
                <Card
                    key={index}
                    className={cn(
                        'max-w-[24%] shrink grow basis-1/4 overflow-hidden rounded-2xl border-[var(--dark-opacity)] bg-card text-card-foreground',
                    )}
                >
                    <CardContent className='flex flex-col'>
                        <CardTitle className='mt-6 w-full text-center text-2xl font-medium'>
                            {post.title}
                        </CardTitle>
                        <CardDescription className='mt-6 w-full text-center text-xl text-card-foreground'>
                            {post.description}
                        </CardDescription>
                    </CardContent>
                    <CardFooter className='flex justify-between'>
                        <form action={deletePost}>
                            <input
                                name='id'
                                readOnly
                                className='hidden'
                                value={post.id}
                            />
                            <Button variant='destructive'>Удалить</Button>
                        </form>
                        <p>id:{post.id}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
