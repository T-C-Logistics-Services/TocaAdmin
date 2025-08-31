import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from '@tanstack/react-router'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { assignBookingOptions } from '../data/queryOptions'
import { driverSchema } from '../data/schema'

interface DataTableRowActionsAssignProps<TData> {
  row: {
    original: TData
  }
}

export function DataTableRowActionsAssign<TData>({
  row,
}: DataTableRowActionsAssignProps<TData>) {
  const router = useRouter()
  const driver = driverSchema.parse(row.original)
  const { bookingId } = useParams({
    from: '/_authenticated/bookings/$bookingId/driver',
  })

  const { mutateAsync: mutateAsyncAssignBooking, isPending } =
    useMutation(assignBookingOptions)

  const handleAssign = async () => {
    await mutateAsyncAssignBooking({
      bookingId,
      driverId: driver.id.toString(),
    })

    toast.success('Driver assigned successfully')

    // Redirect to booking details page after successful assignment
    await router.navigate({
      to: '/bookings',
    })
  }

  return (
    <Button onClick={handleAssign} disabled={isPending}>
      {isPending ? 'Assigning...' : 'Assign'}
    </Button>
  )
}
