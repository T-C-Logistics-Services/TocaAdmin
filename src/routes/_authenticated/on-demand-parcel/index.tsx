import { createFileRoute } from '@tanstack/react-router'
import { OnDemandParcel } from '@/features/on-demand-parcel'
import {
  payersQueryOptions,
  paymentMethodsQueryOptions,
  provinceNcrQueryOptions,
  vehiclesQueryOptions,
} from '@/features/on-demand-parcel/data/queryOptions'

export const Route = createFileRoute('/_authenticated/on-demand-parcel/')({
  component: OnDemandParcel,
  loader: ({ context: { queryClient } }) => {
    return {
      provincesNcr: queryClient.ensureQueryData(provinceNcrQueryOptions),
      paymentMethods: queryClient.ensureQueryData(paymentMethodsQueryOptions),
      payers: queryClient.ensureQueryData(payersQueryOptions),
      vehicles: queryClient.ensureQueryData(vehiclesQueryOptions),
    }
  },
})
