import * as React from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import {
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useApiStore } from '@/stores/apiStore'
import { type Booking } from '../data/schema'
import { DataTablePagination } from '@/features/drivers/components/data-table-pagination'
import { type Driver } from '@/features/drivers/data/schema'

const { getState } = useApiStore

type BookingAssignDriverDialogProps = {
  currentRow?: Booking
  open: boolean
  onOpenChange: (open: boolean) => void
  onAssignDriver: (driverId: number) => void
}

export function BookingAssignDriverDialog({
  open,
  onOpenChange,
  onAssignDriver,
}: BookingAssignDriverDialogProps) {
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  })
  const [selectedDriverId, setSelectedDriverId] = React.useState<number | null>(null)

  const driverQuery = useQuery({
    queryKey: ['drivers', pagination],
    queryFn: ({ signal }) => getState().fetchDrivers({ pagination, signal }),
    placeholderData: keepPreviousData,
  })

  const handleAssignDriver = () => {
    if (selectedDriverId !== null) {
      onAssignDriver(selectedDriverId)
      onOpenChange(false)
    }
  }

  const columns = [
    {
      id: 'select',
      header: () => <span>Select</span>,
      cell: ({ row }: { row: { original: Driver } }) => (
        <input
          type="radio"
          name="driver-selection"
          checked={selectedDriverId === row.original.id}
          onChange={() => setSelectedDriverId(row.original.id)}
        />
      ),
    },
    {
      accessorKey: 'firstName',
      header: () => <span>First Name</span>,
      cell: ({ row }: { row: { original: Driver; getValue: (key: string) => string } }) => (
        <span className="font-medium">{row.getValue('firstName')}</span>
      ),
    },
    {
      accessorKey: 'lastName',
      header: () => <span>Last Name</span>,
      cell: ({ row }: { row: { original: Driver; getValue: (key: string) => string } }) => (
        <span className="font-medium">{row.getValue('lastName')}</span>
      ),
    },
    {
      accessorKey: 'licenseNumber',
      header: () => <span>License Number</span>,
      cell: ({ row }: { row: { original: Driver; getValue: (key: string) => string } }) => (
        <span>{row.getValue('licenseNumber') || 'N/A'}</span>
      ),
    },
    {
      accessorKey: 'contactNumber',
      header: () => <span>Contact Number</span>,
      cell: ({ row }: { row: { original: Driver; getValue: (key: string) => string } }) => (
        <span>{row.getValue('contactNumber') || 'N/A'}</span>
      ),
    },
  ]

  const table = useReactTable({
    data: driverQuery.data?.drivers || [],
    columns: columns,
    state: {
      sorting,
      columnVisibility,
      columnFilters,
      pagination,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    rowCount: driverQuery?.data?.pagination?.total || 0,
    manualPagination: true,
  })

  return (
    <Dialog
      open={open}
      onOpenChange={(state) => {
        onOpenChange(state)
        if (!state) {
          setSelectedDriverId(null)
        }
      }}
    >
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader className="text-start">
          <DialogTitle>Assign Driver</DialogTitle>
          <DialogDescription>
            Select a driver from the list below and click assign
          </DialogDescription>
        </DialogHeader>
        <div className="h-[30rem] overflow-y-auto py-1 pe-3">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && 'selected'}
                      className="cursor-pointer"
                      onClick={() => setSelectedDriverId(row.original.id)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {driverQuery.isLoading ? 'Loading...' : 'No results found.'}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4">
            <DataTablePagination table={table} />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleAssignDriver}
            disabled={selectedDriverId === null}
          >
            Assign Driver
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
