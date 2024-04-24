import { OAuthClient } from './model';
import { OAuthClientRepo } from './repository';

class OAuthClientService {
    private readonly repo: OAuthClientRepo;
    constructor() {
        this.repo = new OAuthClientRepo();
    }

    async findById(client_id: string): Promise<OAuthClient | null> {
        return this.repo.findById(client_id);
    }

    async storeAuthCode(userEmail: string, authCode: string, expiresAt: Date) {
        return this.repo.storeAuthCode(userEmail, authCode, expiresAt);
    }
}

export const oAuthClientController = new OAuthClientService();
