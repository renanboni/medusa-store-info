export enum DocumentType {
    TEXT = "text",
    MARKDOWN = "markdown",
}

export type StoreInfo = {
    id: string
    name: string
    value: string
    key: string
    type: DocumentType
}

export type StoreInfoResponse = {
    storeInfos: StoreInfo[]
    count: number
    limit: number
    offset: number
}

export type CreateStoreInfoRequest = {
    name: string
    value: string
    key: string
    type: DocumentType
}
