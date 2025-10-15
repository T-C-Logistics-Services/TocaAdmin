import { createFileRoute } from '@tanstack/react-router'
import { ParcelPickUp } from '@/features/parcel-pick-up'
import {
  payersQueryOptions,
  paymentMethodsQueryOptions,
  provinceNcrQueryOptions,
} from '@/features/parcel-pick-up/data/queryOptions'

export const Route = createFileRoute('/_authenticated/parcel-pick-up/')({
  component: ParcelPickUp,
  loader: ({ context: { queryClient } }) => {
    return {
      provincesNcr: queryClient.ensureQueryData(provinceNcrQueryOptions),
      paymentMethods: queryClient.ensureQueryData(paymentMethodsQueryOptions),
      payers: queryClient.ensureQueryData(payersQueryOptions),
    }
  },
})
