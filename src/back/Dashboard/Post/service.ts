import { PostData, PostType } from './model';
import { PostRepository } from './repository';

export class PostService {
    private readonly postRepository: PostRepository;
    constructor() {
        this.postRepository = new PostRepository();
    }
    async getPosts(type?: PostType) {
        if (!type) {
            return this.postRepository.getAll();
        }
        return this.postRepository.getWithType(type);
    }

    async addPost(post: Omit<PostData, 'id'>) {
        return this.postRepository.create(post);
    }

    async deletePost(postId: number) {
        return this.postRepository.delete(postId);
    }
}

export const postService = new PostService();
