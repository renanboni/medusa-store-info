import { Module } from "@medusajs/framework/utils"
import StoreInfoService from "./service"

export const STORE_INFO_MODULE = "store_info"

export default Module(STORE_INFO_MODULE, {
    service: StoreInfoService,
})
