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
  createBookingOptions,
  updateBookingOptions,
} from '../data/queryOptions'
import { Booking } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Booking
}

const formSchema = z.object({
  trackingNumber: z.string().min(1, 'Tracking number is required.'),
  typeId: z.number().min(1, 'Type ID is required.'),
  orderId: z.number().min(1, 'Order ID is required.'),
  customerId: z.number().min(1, 'Customer ID is required.'),
  statusId: z.number().min(1, 'Status ID is required.'),
})
type BookingsForm = z.infer<typeof formSchema>

export function BookingsMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow

  const { mutateAsync: mutateAsyncCreate } = useMutation(createBookingOptions)
  const { mutateAsync: mutateAsyncUpdate } = useMutation(updateBookingOptions)

  const form = useForm<BookingsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      trackingNumber: currentRow ? currentRow.trackingNumber : '',
      typeId: currentRow ? currentRow.typeId : 0,
      orderId: currentRow ? currentRow.orderId : 0,
      customerId: currentRow ? currentRow.customerId : 0,
      statusId: currentRow ? currentRow.statusId : 0,
    },
  })

  const onSubmit = async (data: BookingsForm) => {
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
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Booking</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the booking by providing necessary info. '
              : 'Add a new booking by providing necessary info. '}
            Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='bookings-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 overflow-y-auto'
          >
            <div className='space-y-8 p-4'>
              <Input
                control={form.control}
                name='trackingNumber'
                label='Tracking Number'
                placeholder='Enter tracking number'
              />
              <Input
                control={form.control}
                name='typeId'
                label='Type ID'
                placeholder='Enter type ID'
                type='number'
              />
              <Input
                control={form.control}
                name='orderId'
                label='Order ID'
                placeholder='Enter order ID'
                type='number'
              />
              <Input
                control={form.control}
                name='customerId'
                label='Customer ID'
                placeholder='Enter customer ID'
                type='number'
              />
              <Input
                control={form.control}
                name='statusId'
                label='Status ID'
                placeholder='Enter status ID'
                type='number'
              />
            </div>
          </form>
        </Form>

        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='bookings-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
