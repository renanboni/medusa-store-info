import { STORE_INFO_MODULE } from "../../../modules/store-info"
import { createStep, StepResponse } from "@medusajs/framework/workflows-sdk"
import StoreInfoService from "../../../modules/store-info/service"

export type AddStoreInfoStepInput = {
    name: string
    value: string
    key: string
}

export const addStoreInfoStep = createStep(
    "add-store-info-step",
    async (input: AddStoreInfoStepInput, { container }) => {
        const storeInfoModuleService: StoreInfoService = container.resolve(STORE_INFO_MODULE)

        const storeInfo = await storeInfoModuleService.createStoreInfoes(input)

        return new StepResponse(storeInfo, storeInfo.id)
    },
    async (id: string, { container }) => {
        const storeInfoModuleService: StoreInfoService = container.resolve(STORE_INFO_MODULE)

        await storeInfoModuleService.deleteStoreInfoes(id)
    }
)
