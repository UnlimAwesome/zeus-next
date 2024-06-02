'use server';

import { PostData, PostType } from '@/back/Dashboard/Post/model';
import { postService } from '@/back/Dashboard/Post/service';
import { revalidatePath } from 'next/cache';

export const createPost = async (formData: FormData) => {
    const post: Omit<PostData, 'id'> = {
        title: formData.get('title')! as string,
        description: formData.get('description')! as string,
        type: formData.get('type')! as PostType,
    };
    await postService.addPost(post);

    revalidatePath('/dashboard/posts', 'page');
};
