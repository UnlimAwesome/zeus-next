import { OAuthClient } from './model';

// http://localhost:3000/api/auth?response_type=code&client_id=test_id&redirect_uri=%2F&state=123

export const oAuthClientMock: OAuthClient = {
    domain: 'test_domain',
    id: 'test_id',
    name: 'test_name',
    secret: 'test_secret',
    redirectUris: ['http://localhost:3001/callback'],
};
