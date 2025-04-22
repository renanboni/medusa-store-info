import { useState } from "react"
import { DataTable, DataTablePaginationState, toast, useDataTable, usePrompt, DropdownMenu, IconButton } from "@medusajs/ui"
import { StoreInfo } from "../../../types"
import { createDataTableColumnHelper } from "@medusajs/ui"
import { useMemo } from "react"
import { useDeleteStoreInfo, useStoreInfos } from "../../lib/hooks/api/store-info"
import { Trash } from "@medusajs/icons"
import { PencilSquare } from "@medusajs/icons"
import { EllipsisHorizontal } from "@medusajs/icons"

const columnHelper = createDataTableColumnHelper<StoreInfo>()

export const StoreInfoTable = () => {
    const limit = 15
    const [pagination, setPagination] = useState<DataTablePaginationState>({
        pageSize: limit,
        pageIndex: 0,
    })
    const offset = useMemo(() => {
        return pagination.pageIndex * limit
    }, [pagination])

    const columns = [
        columnHelper.accessor("key", {
            header: "Chave",
        }),
        columnHelper.accessor("name", {
            header: "Nome",
        }),
        columnHelper.accessor("value", {
            header: "Valor",
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
        data: storeInfos || [],
        getRowId: (row) => row.id,
        rowCount: storeInfos?.length || 0,
        isLoading,
        pagination: {
            state: pagination,
            onPaginationChange: setPagination,
        },
    })

    return (
        <DataTable instance={table}>
            <DataTable.Table />
            <DataTable.Pagination />
        </DataTable>
    )
}