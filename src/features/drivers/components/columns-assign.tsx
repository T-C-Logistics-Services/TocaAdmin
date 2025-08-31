import { ColumnDef } from '@tanstack/react-table'
import { Driver } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActionsAssign } from './data-table-row-actions-assign'

export const columnsAssign: ColumnDef<Driver>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='First Name' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('firstName')}
      </span>
    ),
  },
  {
    accessorKey: 'lastName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Last Name' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('lastName')}
      </span>
    ),
  },
  {
    accessorKey: 'email',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Email' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('email')}
      </span>
    ),
  },
  {
    accessorKey: 'licenseNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='License Number' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('licenseNumber') || 'N/A'}
      </span>
    ),
  },
  {
    accessorKey: 'contactNumber',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Contact Number' />
    ),
    cell: ({ row }) => (
      <span className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('contactNumber') || 'N/A'}
      </span>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActionsAssign row={row} />,
  },
]