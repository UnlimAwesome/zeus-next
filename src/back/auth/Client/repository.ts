import { clientMock } from '@/auth/Client/mock';

export class ClientRepository {
    async findById(id: string) {
        return clientMock.find((client) => client.id === id);
    }

    async validateSecret(id: string, secret: string) {
        const client = await this.findById(id);
        if (!client) {
            return false;
        }
        return client.secret === secret;
    }
}
export const clientRepository = new ClientRepository();
