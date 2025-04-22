import { AuthenticatedMedusaRequest } from "@medusajs/framework/http"
import { MedusaResponse } from "@medusajs/framework/http"
import { STORE_INFO_MODULE } from "../../../../modules/store-info"
import StoreInfoService from "../../../../modules/store-info/service"

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
