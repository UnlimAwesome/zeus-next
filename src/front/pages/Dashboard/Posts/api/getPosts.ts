'use server';

import { postService } from '@/back/Dashboard/Post/service';

export const getPosts = async () => {
    return await postService.getPosts();
};
