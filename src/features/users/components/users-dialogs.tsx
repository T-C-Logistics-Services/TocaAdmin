import { useMutation } from '@tanstack/react-query'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useUsers } from '../context/users-context'
import { deleteUserOptions } from '../data/queryOptions'
import { UsersMutateDrawer } from './users-mutate-drawer'

export function UsersDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useUsers()
  const { mutateAsync: mutateAsyncDelete } = useMutation(deleteUserOptions)

  return (
    <>
      <UsersMutateDrawer
        key='user-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <UsersMutateDrawer
            key={`user-update-${currentRow.id}`}
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
            key='user-delete'
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
            title={`Delete user?`}
            desc={`You are about to delete a user with name ${currentRow.firstName} ${currentRow.lastName}. This action cannot be undone.`}
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}
