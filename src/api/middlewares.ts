import { defineMiddlewares, validateAndTransformBody, validateAndTransformQuery  } from "@medusajs/framework/http";
import { PostAdminCreateStoreInfo } from "./admin/store-info/validator";
import { createFindParams } from "@medusajs/medusa/api/utils/validators";
export const GetStoreInfoSchema = createFindParams()

export default defineMiddlewares({
    routes: [
        {
            matcher: "/admin/store-info",
            method: "POST",
            middlewares: [
                validateAndTransformBody(PostAdminCreateStoreInfo),
            ],
        },
        {
            matcher: "/admin/store-info",
            method: "GET",
            middlewares: [
                validateAndTransformQuery(
                    GetStoreInfoSchema,
                    {
                        defaults: ["id", "name", "value", "key"],
                        isList: true,
                    }
                ),
            ],
        },
        {
            matcher: "/admin/store-info/:id",
            method: "DELETE"
        },
    ],
})