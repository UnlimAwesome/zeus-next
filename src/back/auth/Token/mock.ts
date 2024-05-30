import { randomBytes } from 'crypto';
import { AuthData, SecretData } from './model';

export const authDataMock: AuthData[] = [];

export const secretDataMock: SecretData[] = [
    {
        clientId: 'client1',
        userId: 'user1',
        secret: randomBytes(32).toString(),
    },
    {
        clientId: 'client2',
        userId: 'user2',
        secret: randomBytes(32).toString(),
    },
    {
        clientId: 'client3',
        userId: 'user3',
        secret: randomBytes(32).toString(),
    },
    {
        clientId: 'client4',
        userId: 'user4',
        secret: randomBytes(32).toString(),
    },
];
