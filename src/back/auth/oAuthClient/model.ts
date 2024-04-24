export interface OAuthClient {
    id: string;
    domain: string;
    name: string;
    secret: string;
    redirectUris: string[];
}
