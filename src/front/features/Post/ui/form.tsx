import {
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from '@/components/ui/dialog';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    Form as FormPrimitive,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { createPost } from '../api/createPost';
import { cn } from '@/front/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { PostType } from '@/back/Dashboard/Post/model';

interface formProps {
    className?: string;
    type: PostType;
}

const formSchema = z.object({
    title: z.string().min(1, 'Заголовок обязателен'),
    description: z.string().min(1, 'Описание обязательно'),
});

export const Form = (props: formProps) => {
    const { className, type, ...otherProps } = props;
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: '',
            description: '',
        },
        mode: 'all',
    });

    return (
        <DialogContent
            className={cn(className)}
            {...otherProps}
        >
            <DialogHeader>
                <DialogTitle>Новая запись</DialogTitle>
                <DialogDescription>{type}</DialogDescription>
            </DialogHeader>
            <FormPrimitive {...form}>
                <form action={createPost}>
                    <input
                        name='type'
                        className='hidden'
                        value={type}
                        readOnly
                    />
                    <FormField
                        control={form.control}
                        name='title'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Заголовок</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name='description'
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Описание</FormLabel>
                                <FormControl>
                                    <Textarea {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button
                                type='submit'
                                disabled={
                                    !form.formState.isValid ||
                                    !form.formState.isDirty
                                }
                            >
                                Создать
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </form>
            </FormPrimitive>
        </DialogContent>
    );
};
