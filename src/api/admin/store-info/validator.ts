import { z } from "zod"

export const PostAdminCreateStoreInfo = z.object({
    name: z.string(),
    value: z.string(),
    key: z.string(),
})

export const PatchAdminUpdateStoreInfo = z.object({
    name: z.string().optional(),
    value: z.string().optional(),
    key: z.string().optional(),
})