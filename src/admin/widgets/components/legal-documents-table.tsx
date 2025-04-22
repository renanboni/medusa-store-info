import { useMemo, useState } from "react"
import { createDataTableColumnHelper, DataTable, DataTablePaginationState, DropdownMenu, IconButton, toast, useDataTable, usePrompt } from "@medusajs/ui"
import { EllipsisHorizontal, PencilSquare, Trash } from "@medusajs/icons"
import { useDeleteStoreInfo, useStoreInfos } from "../../lib/hooks/api/store-info"
import { DocumentType, StoreInfo } from "../../../types"
import { CreateLegalDocumentForm } from "./create-legal-document-form"

const columnHelper = createDataTableColumnHelper<StoreInfo>()

export const LegalDocumentsTable = () => {
    const limit = 15
    const [pagination, setPagination] = useState<DataTablePaginationState>({
        pageSize: limit,
        pageIndex: 0,
    })
    const offset = useMemo(() => {
        return pagination.pageIndex * limit
    }, [pagination])

    const [isOpen, setIsOpen] = useState(false)
    const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null)

    const columns = [
        columnHelper.accessor("key", {
            header: "Chave",
        }),
        columnHelper.accessor("name", {
            header: "Nome",
        }),
        columnHelper.display({
            id: "actions",
            header: () => <div className="w-full text-right"></div>,
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-end w-full gap-2">
                        <DropdownMenu>
                            <DropdownMenu.Trigger asChild>
                                <IconButton variant="transparent">
                                    <EllipsisHorizontal />
                                </IconButton>
                            </DropdownMenu.Trigger>
                            <DropdownMenu.Content align="end">
                                <DropdownMenu.Item className="gap-x-2" onClick={() => {
                                    setStoreInfo(row.original)
                                    setIsOpen(true)
                                }}>
                                    <PencilSquare className="text-ui-fg-subtle" />
                                    Editar
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item className="gap-x-2" onClick={(e) => {
                                    e.stopPropagation();
                                    deleteEntity(row.original.id);
                                }}>
                                    <Trash className="text-ui-fg-subtle" />
                                    Deletar
                                </DropdownMenu.Item>
                            </DropdownMenu.Content>
                        </DropdownMenu>
                    </div>
                )
            },
            size: 50
        })
    ]

    const confirmDeleteDialog = usePrompt()
    const { deleteStoreInfo } = useDeleteStoreInfo()

    const { storeInfos, isLoading } = useStoreInfos(limit, offset)

    const deleteEntity = async (id: string) => {
        const userHasConfirmed = await confirmDeleteDialog({
            title: "Por favor, confirme",
            description: "Você tem certeza de que deseja fazer isso?",
        })

        if (userHasConfirmed) {
            deleteStoreInfo(id, {
                onSuccess: () => {
                    toast.success("Informação da loja deletada com sucesso")
                },
                onError: (error) => {
                    toast.error("Erro ao deletar informação da loja" + error.message)
                }
            })
        }
    }

    const table = useDataTable({
        columns,
        data: storeInfos?.filter((info) => info.type === DocumentType.MARKDOWN) || [],
        getRowId: (row) => row.id,
        rowCount: storeInfos?.filter((info) => info.type === DocumentType.MARKDOWN).length || 0,
        isLoading,
        pagination: {
            state: pagination,
            onPaginationChange: setPagination,
        },
        onRowClick: (_, row) => {
            // @ts-ignore
            setStoreInfo(row.original)
            setIsOpen(true)
        }
    })

    return (
        <>
            <DataTable instance={table}>
                {storeInfos?.filter((info) => info.type === DocumentType.MARKDOWN).length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <p className="text-ui-fg-subtle">Nenhum documento legal encontrado</p>
                    </div>
                ) : (
                    <>
                        <DataTable.Table />
                    </>
                )}
                <DataTable.Pagination />
            </DataTable>
            <CreateLegalDocumentForm storeInfo={storeInfo} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}