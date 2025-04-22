import { AdminStore, DetailWidgetProps } from "@medusajs/framework/types"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Container } from "@medusajs/ui"

const StoreInfoWidget = ({
    data: store,
}: DetailWidgetProps<AdminStore>) => {
    return (
        <Container>
            <h1>Store Info</h1>
        </Container>
    )
}

export const config = defineWidgetConfig({
    zone: "store.details.before",
})

export default StoreInfoWidget