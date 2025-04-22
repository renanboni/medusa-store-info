
export type StoreInfo = {
    id: string
    name: string
    value: string
    key: string
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
}
