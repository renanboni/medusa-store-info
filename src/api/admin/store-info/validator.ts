import { z } from "zod"

export const PostAdminCreateStoreInfo = z.object({
    name: z.string(),
    value: z.string(),
    key: z.string(),
})

