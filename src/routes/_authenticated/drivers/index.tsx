import { createFileRoute } from '@tanstack/react-router'
import Drivers from '@/features/drivers'
import { vehicleQueryOptions } from '@/features/drivers/data/queryOptions'

export const Route = createFileRoute('/_authenticated/drivers/')({
  component: Drivers,
  loader: ({ context: { queryClient } }) => {
    return {
      vehicles: queryClient.ensureQueryData(vehicleQueryOptions),
    }
  },
})
