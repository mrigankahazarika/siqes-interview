import * as React from 'react'
import { useEffect } from 'react'
import { Link } from '@tanstack/react-router'

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'

// later pull tyeps from servicequery stypes 
type Person = {
  title: string
  description: string
  category: number
  priority: number
  status: string
  created_by: number
}


const columnHelper = createColumnHelper<Person>()



const TableCustom = ({
  tableData ,
  setPagination,
  pageIndex,
  pageSize,
  totalItems,
  onPageChange,
  onLimitChange,
  onDelete,
  onStatusUpdate

}: any)=> {
  const [data, _setData] = React.useState(() => [...tableData.data])
  const rerender = React.useReducer(() => ({}), {})[1]



const columns = [
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
    header: () => <span>Visits</span>,
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: 'Status',
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor('created_by', {
    header: 'Profile Progress',
    footer: (info) => info.column.id,
  }),
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }: any) => {
      const item = row.original // Access the full data object for this row
      
      return (
        <div className="flex items-center gap-2">
          <Link
            to={`/service/edit/${item.id}`}
            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
          >
            Edit
          </Link>
          <button
            // onClick={() => handleView(item.id)}
            className="px-3 py-1 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded hover:bg-blue-100 transition-colors"
          >
            View
          </button>
          <button
            onClick={() => handleDelete(item.id, item.title)}
            className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => onStatusUpdate(item.id, item.title)}
            className="px-3 py-1 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded hover:bg-red-100 transition-colors"
          >
            Update Status
          </button>
        </div>
      )
    },
  },
]


  React.useEffect(() => {
    if (tableData?.data) {
      _setData([...tableData.data])
    }
  }, [tableData])

  const handleDelete = (id: string, title: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"? This action cannot be undone.`
    )
    
    if (confirmed && onDelete) {
      onDelete(id)
    }
  }

  const table = useReactTable({
    data,
    columns,
    state: {
      pagination: {
        pageIndex,
        pageSize,
      },
    },
    manualPagination: true,
    pageCount: Math.ceil(totalItems / pageSize),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === 'function') {
        const newState = updater({ pageIndex, pageSize })
        onPageChange(newState.pageIndex)
      } else {
        onPageChange(updater.pageIndex)
      }
    }
  })

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-sm">
        <table className="w-full text-left text-sm text-slate-600 border-collapse">
        <thead className="bg-slate-50 text-slate-800 uppercase text-xs font-semibold border-b border-slate-200">
         {table.getHeaderGroups().map(headerGroup => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map(header => (
            <th key={header.id} className="px-6 py-4 tracking-wider">
              {flexRender(header.column.columnDef.header, header.getContext())}
            </th>
          ))}
        </tr>
      ))}
        </thead>
       <tbody className="divide-y divide-slate-200">
      {table.getRowModel().rows.map(row => (
        <tr key={row.id} className="hover:bg-slate-50 transition-colors">
          {row.getVisibleCells().map(cell => (
            <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </td>
          ))}
        </tr>
      ))}
    </tbody>
        <tfoot className="divide-y divide-slate-200">
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id} className="hover:bg-slate-50 transition-colors">
              {footerGroup.headers.map((header) => (
                <th key={header.id} className="px-6 py-4 whitespace-nowrap">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="h-4" />
        <div className="flex gap-2 p-4">
        <button 
          onClick={() => table.previousPage()} 
          disabled={!table.getCanPreviousPage()}
          className="disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {table.getState().pagination.pageIndex} of {table.getPageCount()}
        </span>
        <button 
          onClick={() => table.nextPage()} 
          disabled={!table.getCanNextPage()}
          className="disabled:opacity-50"
        >
          Next
        </button>
        </div>
        <div className="flex items-center gap-2 ml-auto">
        <span className="text-sm ">Show</span>
        <select
            className="border rounded p-1 text-sm bg-white"
            value={table.getState().pagination.pageSize}
            onChange={e => {
                onLimitChange(Number(e.target.value))
            }}
        >
            {[2, 5, 10, 20, 30, 40, 50].map(pageSize => (
                <option key={pageSize} value={pageSize}>
                    {pageSize}
                </option>
            ))}
        </select>
    </div>
    </div>
  )
}


export default TableCustom;