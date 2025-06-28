import { useMutation } from '@tanstack/react-query'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDrivers } from '../context/drivers-context'
import { deleteDriverOptions } from '../data/queryOptions'
import { DriversMutateDrawer } from './drivers-mutate-drawer'

export function DriversDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useDrivers()
  const { mutateAsync: mutateAsyncDelete } = useMutation(deleteDriverOptions)

  return (
    <>
      <DriversMutateDrawer
        key='driver-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <DriversMutateDrawer
            key={`driver-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='driver-delete'
            destructive
            className='max-w-md'
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={async () => {
              setOpen(null)
              await mutateAsyncDelete({ id: currentRow.id.toString() })
            }}
            title={`Delete driver?`}
            desc={`You are about to delete a driver with name ${currentRow.firstName} ${currentRow.lastName}. This action cannot be undone.`}
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}
