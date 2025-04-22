import { AuthenticatedMedusaRequest } from "@medusajs/framework/http"
import { MedusaResponse } from "@medusajs/framework/http"
import { STORE_INFO_MODULE } from "../../../../modules/store-info"
import StoreInfoService from "../../../../modules/store-info/service"
import { PatchAdminUpdateStoreInfo } from "../validator"
import { z } from "zod"
export const DELETE = async (
    req: AuthenticatedMedusaRequest,
    res: MedusaResponse
) => {
    const { id } = req.params

    const storeInfoModule : StoreInfoService = req.scope.resolve(STORE_INFO_MODULE)

    // @ts-ignore
    await storeInfoModule.deleteStoreInfos(id)

    return res.status(200).json({})
}

type PatchAdminUpdateStoreInfoType = z.infer<typeof PatchAdminUpdateStoreInfo>

export const PATCH = async (
    req: AuthenticatedMedusaRequest<PatchAdminUpdateStoreInfoType>,
    res: MedusaResponse
) => {
    const { id } = req.params

    const storeInfoModule : StoreInfoService = req.scope.resolve(STORE_INFO_MODULE)

    // @ts-ignore
    await storeInfoModule.updateStoreInfos({
        id,
        ...req.validatedBody
    }) 

    return res.status(200).json({})
}