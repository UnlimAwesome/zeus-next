'use server';
import { postService } from '@/back/Dashboard/Post/service';
import { revalidatePath } from 'next/cache';

export const deletePost = async (formData: FormData) => {
    const id = Number(formData.get('id'));
    await postService.deletePost(id);
    revalidatePath('/dashboard/posts');
};
