export type PostType = 'Продвижение компании' | 'Для наших пользователей';

export interface PostData {
    id: number;
    title: string;
    description: string;
    type: PostType;
}
