import { useState } from "react"
import { DataTable, DataTablePaginationState, toast, useDataTable, usePrompt, DropdownMenu, IconButton } from "@medusajs/ui"
import { StoreInfo } from "../../../types"
import { createDataTableColumnHelper } from "@medusajs/ui"
import { useMemo } from "react"
import { useDeleteStoreInfo, useStoreInfos } from "../../lib/hooks/api/store-info"
import { Trash } from "@medusajs/icons"
import { PencilSquare } from "@medusajs/icons"
import { EllipsisHorizontal } from "@medusajs/icons"
import { UpdateStoreInfoDrawer } from "./update-store-info-drawer"
import { DocumentType } from "../../../types"

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

    const [isOpen, setIsOpen] = useState(false)
    const [storeInfo, setStoreInfo] = useState<StoreInfo | null>(null)

    const columns = [
        columnHelper.accessor("key", {
            header: "Key",
        }),
        columnHelper.accessor("name", {
            header: "Name",
        }),
        columnHelper.accessor("value", {
            header: "Value",
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
                                    Edit
                                </DropdownMenu.Item>
                                <DropdownMenu.Separator />
                                <DropdownMenu.Item className="gap-x-2" onClick={(e) => {
                                    e.stopPropagation();
                                    deleteEntity(row.original.id);
                                }}>
                                    <Trash className="text-ui-fg-subtle" />
                                    Delete
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
            title: "Please confirm",
            description: "Are you sure you want to delete this?",
        })

        if (userHasConfirmed) {
            deleteStoreInfo(id, {
                onSuccess: () => {
                    toast.success("Store information deleted successfully")
                },
                onError: (error) => {
                    toast.error("Error deleting store information" + error.message)
                }
            })
        }
    }

    const table = useDataTable({
        columns,
        data: storeInfos?.filter((info) => info.type === DocumentType.TEXT) || [],
        getRowId: (row) => row.id,
        rowCount: storeInfos?.filter((info) => info.type === DocumentType.TEXT).length || 0,
        isLoading,
        pagination: {
            state: pagination,
            onPaginationChange: setPagination,
        },
    })

    return (
        <>
            <DataTable instance={table}>
                {storeInfos?.filter((info) => info.type === DocumentType.TEXT).length === 0 ? (
                    <div className="flex flex-col items-center justify-center p-12 text-center">
                        <p className="text-ui-fg-subtle">No store information found</p>
                    </div>
                ) : (
                    <>
                        <DataTable.Table />
                    </>
                )}
                <DataTable.Pagination />
            </DataTable>

            <UpdateStoreInfoDrawer storeInfo={storeInfo} isOpen={isOpen} setIsOpen={setIsOpen} />
        </>
    )
}