import { MedusaRequest } from "@medusajs/framework/http"
import { MedusaResponse } from "@medusajs/framework/http"
import { addStoreInfoWorkflow } from "../../../workflows/add-store-info"
import { PostAdminCreateStoreInfo } from "./validator"
import { z } from "zod"

type PostAdminCreateStoreInfoType = z.infer<typeof PostAdminCreateStoreInfo>

export const POST = async (
    req: MedusaRequest<PostAdminCreateStoreInfoType>,
    res: MedusaResponse
) => {
    const { result } = await addStoreInfoWorkflow(req.scope)
        .run({
            input: req.validatedBody,
        })

    res.json({ storeInfo: result })
}

export const GET = async (
    req: MedusaRequest,
    res: MedusaResponse
) => {
    const query = req.scope.resolve("query")

    const {
        data: storeInfos,
        metadata: { count, take, skip } = {},
    } = await query.graph({
        entity: "store_info",
        ...req.queryConfig,
    })

    res.json({
        storeInfos,
        count,
        limit: take,
        offset: skip,
    })
}
