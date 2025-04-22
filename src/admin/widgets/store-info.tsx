"use client"

import { AdminStore, DetailWidgetProps } from "@medusajs/framework/types"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Header } from "../components/header"
import { Container } from "../components/container"
import { Plus } from "@medusajs/icons"
import { useState } from "react"
import { CreateStoreInfoForm } from "./components/create-store-info-form"
import { StoreInfoTable } from "./components/store-info-table"

const StoreInfoWidget = ({}: DetailWidgetProps<AdminStore>) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <Container>
            <Header
                title="Informações da loja"
                subtitle="Gerencie as informações que serão exibidas na loja"
                actions={[
                    {
                        type: "action-menu",
                        props: {
                            groups: [
                                {
                                    actions: [
                                        {
                                            icon: <Plus />,
                                            label: "Adicionar",
                                            onClick: () => {
                                                setIsOpen(true)
                                            },
                                        },
                                    ],
                                },
                            ],
                        },
                    },
                ]}
            />
            <StoreInfoTable />
            <CreateStoreInfoForm isOpen={isOpen} setIsOpen={setIsOpen} />
        </Container>
    )
}

export const config = defineWidgetConfig({
    zone: "store.details.before",
})

export default StoreInfoWidget