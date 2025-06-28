import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
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
import {
  createCustomerOptions,
  updateCustomerOptions,
} from '../data/queryOptions'
import { Customer } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Customer
}

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  shopName: z.string().min(1, 'Shop name is required.'),
  mainAddress: z.string().min(1, 'Main address is required.'),
  secondaryAddress: z.string().min(1, 'Secondary address is required.'),
  email: z.string().email('Invalid email format.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})
type CustomersForm = z.infer<typeof formSchema>

export function CustomersMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const isUpdate = !!currentRow

  const { mutateAsync: mutateAsyncCreate } = useMutation(createCustomerOptions)
  const { mutateAsync: mutateAsyncUpdate } = useMutation(updateCustomerOptions)

  const form = useForm<CustomersForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentRow ? currentRow.firstName : '',
      lastName: currentRow ? currentRow.lastName : '',
      shopName: currentRow ? currentRow.shopName : '',
      mainAddress: currentRow ? currentRow.mainAddress : '',
      secondaryAddress: currentRow ? currentRow.secondaryAddress : '',
      email: currentRow ? currentRow.email : '',
      password: '',
    },
  })

  const onSubmit = async (data: CustomersForm) => {
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
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Customer</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the customer by providing necessary info. '
              : 'Add a new customer by providing necessary info. '}
            Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='customers-form'
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
                name='shopName'
                label='Shop Name'
                placeholder='Enter shop name'
              />
              <Input
                control={form.control}
                name='mainAddress'
                label='Main Address'
                placeholder='Enter main address'
              />
              <Input
                control={form.control}
                name='secondaryAddress'
                label='Secondary Address'
                placeholder='Enter secondary address'
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
          <Button form='customers-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
