import { model } from "@medusajs/framework/utils";

export const StoreInfo = model.define("store_info", {
    id: model.id().primaryKey(),
    key: model.text(),
    name: model.text(),
    value: model.text(),
})
