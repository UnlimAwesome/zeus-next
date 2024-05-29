export interface Client {
    id: string;
    domain: string;
    name: string;
    secret: string;
    redirectUris: string[];
}
