import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const query = req.scope.resolve("query")

  const {
    data: storeInfos,
  } = await query.graph({
    entity: "store_info",
    fields: ["id", "name", "value", "key", "type"],
  })

  const storeInfoRecord = storeInfos.reduce((acc, info) => {
    acc[info.key] = info
    return acc
  }, {})

  res.json(storeInfoRecord)
}
