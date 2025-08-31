import { createFileRoute } from '@tanstack/react-router'
import AssignBooking from '@/features/drivers/assign-booking'

export const Route = createFileRoute(
  '/_authenticated/bookings/$bookingId/driver'
)({
  component: AssignBooking,
})
