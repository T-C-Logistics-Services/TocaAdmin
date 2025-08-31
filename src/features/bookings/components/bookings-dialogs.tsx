import { useBookings } from '../context/bookings-context'
import { BookingAssignDriverDialog } from './bookings-assign-driver-dialog'
import { BookingsMutateDrawer } from './bookings-mutate-drawer'

export function BookingsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useBookings()

  const handleAssignDriver = (driverId: number) => {
    // TODO: Implement the assign driver logic
    console.log('Assigning driver ID:', driverId, 'to booking:', currentRow)
  }

  return (
    <>
      <BookingsMutateDrawer
        key='booking-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <BookingAssignDriverDialog
            key='assign-driver'
            open={open === 'assign-driver'}
            onOpenChange={() => {
              setOpen('assign-driver')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
            onAssignDriver={handleAssignDriver}
          />
        </>
      )}
    </>
  )
}
