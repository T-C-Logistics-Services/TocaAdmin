import { useMutation } from '@tanstack/react-query'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useCustomers } from '../context/customers-context'
import { deleteCustomerOptions } from '../data/queryOptions'
import { CustomersMutateDrawer } from './customers-mutate-drawer'

export function CustomersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCustomers()
  const { mutateAsync: mutateAsyncDelete } = useMutation(deleteCustomerOptions)

  return (
    <>
      <CustomersMutateDrawer
        key='customer-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <CustomersMutateDrawer
            key={`customer-update-${currentRow.id}`}
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
            key='customer-delete'
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
            title={`Delete customer?`}
            desc={`You are about to delete a customer with name ${currentRow.firstName} ${currentRow.lastName}. This action cannot be undone.`}
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}
