import { sdk } from "../../sdk"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { CreateStoreInfoRequest, StoreInfoResponse } from "../../../../types"

export const useStoreInfos = (limit: number, offset: number, fields?: string) => {
    const { data, isLoading } = useQuery<StoreInfoResponse>({
        queryFn: () => sdk.client.fetch(`/admin/store-info`, {
            query: {
                limit,
                offset,
                fields,
            },
        }),
        queryKey: ["store-info", limit, offset],
    })

    return {
        storeInfos: data?.storeInfos,
        isLoading,
    }
}

export const useCreateStoreInfo = () => {
    const queryClient = useQueryClient()
    const { mutateAsync: createStoreInfo, isPending } = useMutation({
        mutationFn: (storeInfo: CreateStoreInfoRequest) => sdk.client.fetch(`/admin/store-info`, {
            method: "POST",
            body: storeInfo,
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["store-info"] })
        },
    })

    return {
        createStoreInfo,
        isPending,
    }
}

export const useDeleteStoreInfo = () => {
    const queryClient = useQueryClient()
    const { mutateAsync: deleteStoreInfo, isPending } = useMutation({
        mutationFn: async (id: string) => {
            await sdk.client.fetch(`/admin/store-info/${id}`, {
                method: "DELETE",
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["store-info"] })
        },
    })

    return { deleteStoreInfo, isPending }
}