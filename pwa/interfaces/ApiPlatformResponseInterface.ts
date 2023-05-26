export interface ApiPlatformResponse<T> {
    "@context": string;
    "@id": string;
    "@type": "hydra:Collection"
    "hydra:member": Array<T>,
    "hydra:totalItems": number
}
export interface ApiPlatformItemResponse {
    "@context": string;
    "@id": string;
    "@type": string;
    id: string;
}

export interface ApiPlatformErrorResponse {
    "@context": string,
    "@type": string,
    "hydra:title": string,
    "hydra:description": string,
}