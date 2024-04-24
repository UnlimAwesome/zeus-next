import { OAuthClient } from './model';
import { oAuthClientMock } from './mock';

export class OAuthClientRepo {
    storeAuthCode(userEmail: string, authCode: string, expiresAt: Date) {
        throw new Error('Method not implemented.');
    }
    async findById(client_id: string): Promise<OAuthClient | null> {
        if (client_id === 'test_id') {
            return oAuthClientMock;
        }
        return null;
    }
    async create() {
        return;
    }
    async update() {
        return;
    }
    async delete() {
        return;
    }
}
