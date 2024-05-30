import { ClientRepository } from './repository';

describe('ClientRepository', () => {
    let clientRepository: ClientRepository;

    beforeEach(() => {
        clientRepository = new ClientRepository();
    });

    describe('findById', () => {
        it('should return a client when given a valid id', async () => {
            const client = await clientRepository.findById('client1');
            expect(client).toBeDefined();
            expect(client?.id).toBe('client1');
            expect(client?.name).toBe('test_name');
        });

        it('should return undefined when given an invalid id', async () => {
            const client = await clientRepository.findById('invalid_id');
            expect(client).toBeUndefined();
        });
    });

    describe('validateSecret', () => {
        it('should return true when the secret is valid for the given client id', async () => {
            const isValid = await clientRepository.validateSecret(
                'client1',
                'test_secret',
            );
            expect(isValid).toBe(true);
        });

        it('should return false when the secret is invalid for the given client id', async () => {
            const isValid = await clientRepository.validateSecret(
                'client1',
                'wrong_secret',
            );
            expect(isValid).toBe(false);
        });

        it('should return false when the client id is invalid', async () => {
            const isValid = await clientRepository.validateSecret(
                'invalid_id',
                'test_secret',
            );
            expect(isValid).toBe(false);
        });
    });
});
