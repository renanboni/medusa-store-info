import { z } from "zod"
import { DocumentType } from "../../../types"

export const PostAdminCreateStoreInfo = z.object({
    name: z.string(),
    value: z.string(),
    key: z.string(),
    type: z.nativeEnum(DocumentType).optional().default(DocumentType.TEXT)
})

export const PatchAdminUpdateStoreInfo = z.object({
    name: z.string().optional(),
    value: z.string().optional(),
    key: z.string().optional(),
    type: z.nativeEnum(DocumentType).optional().default(DocumentType.TEXT)
})