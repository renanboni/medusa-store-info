import { useState } from "react"
import { DataTable, DataTablePaginationState, useDataTable } from "@medusajs/ui"
import { StoreInfo } from "../../../types"
import { createDataTableColumnHelper } from "@medusajs/ui"
import { useMemo } from "react"
import { useStoreInfos } from "../../lib/hooks/api/store-info"

const columnHelper = createDataTableColumnHelper<StoreInfo>()

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
]

export const StoreInfoTable = () => {
    const limit = 15
    const [pagination, setPagination] = useState<DataTablePaginationState>({
        pageSize: limit,
        pageIndex: 0,
    })
    const offset = useMemo(() => {
        return pagination.pageIndex * limit
    }, [pagination])

    const { storeInfos, isLoading } = useStoreInfos(limit, offset)

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