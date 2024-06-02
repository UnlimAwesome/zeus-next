import { postDataMock } from './mock';
import { PostData, PostType } from './model';

export class PostRepository {
    getWithType(type: PostType) {
        return postDataMock.filter((post) => post.type === type);
    }
    async create(post: Omit<PostData, 'id'>) {
        postDataMock.push({ ...post, id: postDataMock.length + 1 });
        return postDataMock[postDataMock.length];
    }
    async delete(postId: number) {
        const index = postDataMock.findIndex((post) => post.id === postId);
        postDataMock.splice(index, 1);
    }
    async getAll() {
        return postDataMock;
    }
}
