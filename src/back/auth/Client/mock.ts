import { Client } from '@/auth/Client/model';

export const clientMock: Client[] = [
    {
        domain: 'test_domain',
        id: 'client1',
        name: 'test_name',
        secret: 'test_secret',
        redirectUris: ['http://localhost:3001/callback'],
    },
];
