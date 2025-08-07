import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { Hub, Role } from '@/stores/apiStore'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/form/input'
import { Select } from '@/components/form/select'
import {
  createUserOptions,
  hubQueryOptions,
  roleQueryOptions,
  updateUserOptions,
} from '../data/queryOptions'
import { User } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: User
}

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  address: z.string().min(1, 'Address is required.').nullable(),
  accountNumber: z.coerce
    .string()
    .min(1, 'Account number is required.')
    .nullable(),
  contactNumber: z.string().min(1, 'Contact number is required.').nullable(),
  hubId: z.coerce.string().min(1, 'Hub ID is required.').nullable(),
  role: z.string().min(1, 'Role is required.').nullable(),
  email: z.string().email('Invalid email format.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})
type UsersForm = z.infer<typeof formSchema>

export function UsersMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow

  const {
    data: { hubs },
  } = useSuspenseQuery(hubQueryOptions)
  const {
    data: { roles },
  } = useSuspenseQuery(roleQueryOptions)
  const { mutateAsync: mutateAsyncCreate } = useMutation(createUserOptions)
  const { mutateAsync: mutateAsyncUpdate } = useMutation(updateUserOptions)

  const form = useForm<UsersForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentRow ? currentRow.firstName : '',
      lastName: currentRow ? currentRow.lastName : '',
      address: currentRow ? currentRow.address : '',
      accountNumber: currentRow ? currentRow.accountNumber : '',
      contactNumber: currentRow ? currentRow.contactNumber : '',
      hubId: currentRow ? String(currentRow.hubId) : '',
      role: currentRow ? currentRow.role : '',
      email: currentRow ? currentRow.email : '',
      password: '',
    },
  })

  const onSubmit = async (data: UsersForm) => {
    if (isUpdate) {
      await mutateAsyncUpdate({ data, id: currentRow.id.toString() })
    } else {
      await mutateAsyncCreate({ data })
    }

    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} User</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the user by providing necessary info. '
              : 'Add a new user by providing necessary info. '}
            Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='users-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 overflow-y-auto'
          >
            <div className='space-y-8 p-4'>
              <Input
                control={form.control}
                name='firstName'
                label='First Name'
                placeholder='Enter first name'
              />
              <Input
                control={form.control}
                name='lastName'
                label='Last Name'
                placeholder='Enter last name'
              />
              <Input
                control={form.control}
                name='address'
                label='Address'
                placeholder='Enter address'
              />
              <Input
                control={form.control}
                name='accountNumber'
                label='Account Number'
                placeholder='Enter account number'
              />
              <Input
                control={form.control}
                name='contactNumber'
                label='Contact Number'
                placeholder='Enter contact number'
              />
              <Select
                control={form.control}
                name='role'
                label='Role'
                placeholder='Select role'
                options={roles.map((role: Role) => ({
                  value: role.role,
                  label: role.name,
                }))}
              />
              <Select
                control={form.control}
                name='hubId'
                label='Hub'
                placeholder='Select hub'
                options={hubs.map((hub: Hub) => ({
                  value: hub.id,
                  label: hub.hub,
                }))}
              />
              <Input
                control={form.control}
                name='email'
                label='Email'
                placeholder='Enter email'
              />
              <Input
                control={form.control}
                name='password'
                label='Password'
                type='password'
                placeholder='Enter password'
              />
            </div>
          </form>
        </Form>

        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='users-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
