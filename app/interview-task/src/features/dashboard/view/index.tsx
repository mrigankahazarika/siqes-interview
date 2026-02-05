import { Link } from "@tanstack/react-router";
import TableCustom from "../../../components/global/table"
import { useState } from "react";
import { useGetServicrequests } from "../../service-requests/hooks/useServicesList.query";
import { createColumnHelper } from "@tanstack/react-table";
import { useGetServicOptions } from "../../service-requests/hooks/useServiceTypes.query";

export default function DashboardView() {

    const [pagination, setPagination] = useState<any>({
        page: 1,
        limit: 2
    })

    const [filters, setFilters] = useState({
        status: '',
        sort: 'desc'
    })

    const { data, isFetching }: any = useGetServicrequests(pagination.page, pagination.limit, filters.status, filters.sort);

    const { data: serviceTypes, isFetching: isServiceTypesFetching }: any = useGetServicOptions()

    const {
        category: serviceCats = [],
        priority = [],
        statues: serviceStatues = []
    } = serviceTypes || {};

    if (!data || isFetching) {
        return 'loding';
    }

    // table columns
    const columnHelper = createColumnHelper<any>()

    const getTableColumns = (onDelete: (id: string) => void, onStatusUpdate: (id: string) => void) => [
        columnHelper.accessor('title', {
            cell: (info) => info.getValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor((row) => row.description, {
            id: 'description',
            cell: (info) => <i>{info.getValue()}</i>,
            header: () => <span>Description</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('category', {
            header: () => 'category',
            cell: (info) => info.renderValue(),
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('priority', {
            header: () => <span>priority</span>,
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('status', {
            header: 'Status',
            footer: (info) => info.column.id,
        }),
        columnHelper.accessor('user', {
            header: 'USer Info',
            cell: (info) => {
                const value = info.getValue();
                return <>
                    <p>{(value && value.name)}</p>
                    <p>{(value && value.email)}</p>
                </>
            },
            footer: (info) => info.column.id,
        }),
    ]
    // table columns



    return (
        <div className="flex flex-col w-full">
            <Link to="/service/create" className="bg-[teal] text-white p-3 m-3 ml-auto">Add Service Request</Link>

            {
                isServiceTypesFetching ? <div>Loading options...</div> :
                    <div className="flex gap-4 p-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Status</label>
                            <select
                                value={filters.status}
                                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                {
                                    serviceStatues.map((item: any) => (
                                        <option value={item.value}>{item.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Sort by Date</label>
                            <select
                                value={filters.sort}
                                onChange={(e) => setFilters(prev => ({ ...prev, sort: e.target.value }))}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            >
                                <option value="desc">Newest First</option>
                                <option value="asc">Oldest First</option>
                            </select>
                        </div>
                    </div>
            }



            {/* usually we pass props to global component , as i have only one table for this , so i am changing things here directly */}
            <TableCustom

                tableData={data}
                totalItems={data?.meta?.total || 0}
                pageIndex={pagination.page - 1}
                pageSize={pagination.limit}
                onPageChange={(pageIndex: any) => {
                    // console.log(pageIndex,'pageIndex');

                    setPagination((prev) => ({
                        ...prev,
                        page: pageIndex + 1
                    }))
                }}
                onLimitChange={(newLimit: any) => {
                    setPagination(prev => ({ ...prev, limit: newLimit, page: 1 })) // Reset to page 1
                }}
                onDelete={() => void (0)}
                onStatusUpdate={() => void (0)}
                columns={getTableColumns(() => void (0), () => void (0))}
            />
            {isFetching && <span> Updating...</span>}

        </div>



    )
}