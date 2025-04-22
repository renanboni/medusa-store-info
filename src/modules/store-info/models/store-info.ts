import { model } from "@medusajs/framework/utils";
import StoreInfoModuleService from "../service";

enum DocumentType {
    TEXT = "text",
    MARKDOWN = "markdown",
}

// @ts-ignore
declare module "@medusajs/framework/types" {
    export interface ModuleImplementations {
        storeInfoModuleService: StoreInfoModuleService;
    }
}

export const StoreInfo = model.define("store_info", {
    id: model.id().primaryKey(),
    key: model.text().unique(),
    name: model.text(),
    value: model.text(),
    type: model.enum(DocumentType).default(DocumentType.TEXT),
})
