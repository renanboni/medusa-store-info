"use client"

import { AdminStore, DetailWidgetProps } from "@medusajs/framework/types"
import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { Header } from "../components/header"
import { Container } from "../components/container"
import { Plus } from "@medusajs/icons"
import { useState } from "react"
import { CreateStoreInfoForm } from "./components/create-store-info-form"
import { StoreInfoTable } from "./components/store-info-table"
import { CreateLegalDocumentForm } from "./components/create-legal-document-form"
import { LegalDocumentsTable } from "./components/legal-documents-table"

const StoreInfoWidget = ({ }: DetailWidgetProps<AdminStore>) => {
    const [isOpen, setIsOpen] = useState(false)
    const [isLegalDocumentOpen, setIsLegalDocumentOpen] = useState(false)

    return (
        <div>
            <Container>
                <Header
                    title="Store Information"
                    subtitle="Manage the information that will be displayed in the store"
                    actions={[
                        {
                            type: "action-menu",
                            props: {
                                groups: [
                                    {
                                        actions: [
                                            {
                                                icon: <Plus />,
                                                label: "Add",
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

            <Container className="mt-3">
                <Header
                    title="Legal Documents"
                    subtitle="Manage the legal documents of the store"
                    actions={[
                        {
                            type: "action-menu",
                            props: {
                                groups: [
                                    {
                                        actions: [
                                            {
                                                icon: <Plus />,
                                                label: "Add",
                                                onClick: () => {
                                                    setIsLegalDocumentOpen(true)
                                                },
                                            },
                                        ],
                                    },
                                ],
                            },
                        },
                    ]}
                />
                <LegalDocumentsTable />
                <CreateLegalDocumentForm storeInfo={null} isOpen={isLegalDocumentOpen} setIsOpen={setIsLegalDocumentOpen} />
            </Container>
        </div>
    )
}

export const config = defineWidgetConfig({
    zone: "store.details.before",
})

export default StoreInfoWidget