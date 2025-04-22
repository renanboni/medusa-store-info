import { createWorkflow, WorkflowResponse } from "@medusajs/framework/workflows-sdk"
import { addStoreInfoStep } from "./steps/add-store-info-step"
import { DocumentType } from "../../types"

type AddStoreInfoWorkflowInput = {
    name: string
    value: string
    key: string
    type: DocumentType
}

export const addStoreInfoWorkflow = createWorkflow(
    "add-store-info",
    (input: AddStoreInfoWorkflowInput) => {
        const storeInfo = addStoreInfoStep(input)

        return new WorkflowResponse(storeInfo)
    }
)
