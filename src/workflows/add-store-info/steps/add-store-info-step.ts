import { STORE_INFO_MODULE } from "../../../modules/store-info"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import StoreInfoService from "../../../modules/store-info/service"
import { DocumentType } from "../../../types"
export type AddStoreInfoStepInput = {
    name: string
    value: string
    key: string,
    type: DocumentType
}

export const addStoreInfoStep = createStep(
    "add-store-info-step",
    async (input: AddStoreInfoStepInput, { container }) => {
        const storeInfoModuleService: StoreInfoService = container.resolve(STORE_INFO_MODULE)

        // @ts-ignore
        const storeInfo = await storeInfoModuleService.createStoreInfos(input)

        return new StepResponse(storeInfo, storeInfo.id)
    },
    async (id: string, { container }) => {
        const storeInfoModuleService: StoreInfoService = container.resolve(STORE_INFO_MODULE)

        // @ts-ignore
        await storeInfoModuleService.deleteStoreInfos(id)
    }
)
