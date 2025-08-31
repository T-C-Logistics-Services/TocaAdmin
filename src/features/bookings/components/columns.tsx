import { ReactNode } from '@tanstack/react-router'
import { ColumnDef } from '@tanstack/react-table'
import { Booking } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

interface CellProp {
  getValue?: ReactNode
  row?: ReactNode
}

export const columns: ColumnDef<Booking>[] = [
  // {
  //   accessorKey: 'id',
  // },
  {
    accessorKey: 'order.deliveryDate',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Delivery Date' />
    ),
    cell: ({ getValue }: CellProp) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {new Date(getValue() as string).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    ),
  },
  {
    accessorKey: 'sender.name', // Access nested property
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Sender Name' />
    ),
    cell: ({ getValue }: CellProp) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {getValue()}
      </span>
    ),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Type' />
    ),
    cell: ({ getValue }: CellProp) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {getValue()}
      </span>
    ),
  },
  {
    accessorKey: 'trackingNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Tracking Number' />
    ),
    cell: ({ getValue }: CellProp) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {getValue()}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Date Requested' />
    ),
    cell: ({ getValue }: CellProp) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {new Date(getValue() as string).toLocaleString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })}
      </span>
    ),
    enableSorting: false,
  },
  {
    accessorKey: 'recipient.provinceName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ getValue }: CellProp) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {getValue()}
      </span>
    ),
    enableSorting: false,
  },
  {
    id: 'actions',
    cell: ({ row }: CellProp) => <DataTableRowActions row={row} />,
  },
]
