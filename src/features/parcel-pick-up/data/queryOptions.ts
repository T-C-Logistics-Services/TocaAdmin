import { AxiosRequestConfig } from 'axios'
import { queryOptions } from '@tanstack/react-query'
import { useApiStore } from '@/stores/apiStore'

const { getState } = useApiStore

export const provinceNcrQueryOptions = queryOptions({
  queryKey: ['provinces-ncr'],
  queryFn: ({ signal }) => getState().fetchProvincesNcr({ signal }),
  staleTime: 1000 * 60 * 60, // 60 minutes
})

export const cityNcrQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['cities-ncr', id],
    queryFn: ({ signal }) => getState().fetchCitiesNcr({ id, signal }),
    staleTime: 1000 * 60 * 60, // 60 minutes
  })

export const barangayDistrictQueryOptions = (id: string) =>
  queryOptions({
    queryKey: ['barangay-district', id],
    queryFn: ({ signal }) => getState().fetchBarangayDistrict({ id, signal }),
    staleTime: 1000 * 60 * 60, // 60 minutes
  })

export const paymentMethodsQueryOptions = queryOptions({
  queryKey: ['payment-methods'],
  queryFn: ({ signal }) => getState().fetchPaymentMethods({ signal }),
  staleTime: 1000 * 60 * 60, // 60 minutes
})

export const payersQueryOptions = queryOptions({
  queryKey: ['payers'],
  queryFn: ({ signal }) => getState().fetchPayers({ signal }),
  staleTime: 1000 * 60 * 60, // 60 minutes
})

export const createParcelPickUpOptions = {
  mutationFn: (values: AxiosRequestConfig) =>
    getState().createParcelPickUpBooking({ data: values.data }),
}

export const createOnDemandParcelBookingOptions = {
  mutationFn: (values: AxiosRequestConfig) =>
    getState().createOnDemandParcelBooking({ data: values.data }),
}

export const estimateParcelPickUpQueryOptions = (
  data: Record<string, string | undefined>
) =>
  queryOptions({
    queryKey: ['estimate-parcel-pick-up', data],
    queryFn: ({ signal }) =>
      getState().fetchEstimateParcelPickUp({ data, signal }),
    staleTime: 1000 * 60 * 1, // 60 sec
  })

export const estimateOnDemandParcelQueryOptions = (
  data: Record<string, string>
) =>
  queryOptions({
    queryKey: ['estimate-on-demand-parcel', data],
    queryFn: ({ signal }) =>
      getState().fetchEstimateOnDemandParcel({ data, signal }),
    staleTime: 1000 * 60 * 1, // 60 sec
  })

export const parcelPackageQueryOptions = queryOptions({
  queryKey: ['parcel-packages'],
  queryFn: ({ signal }) => getState().fetchParcelPackages({ signal }),
  staleTime: 1000 * 60 * 60, // 60 minutes
})

export const cashOnDeliveryOptions = queryOptions({
  queryKey: ['cash-on-delivery-id'],
  queryFn: ({ signal }) => getState().fetchCashOnDeliveryId({ signal }),
  staleTime: 1000 * 60 * 60, // 60 minutes
})

export const barcodeQueryOptions = (waybill: string) =>
  queryOptions({
    queryKey: ['barcode', waybill],
    queryFn: ({ signal }) => getState().fetchBarcode({ waybill, signal }),
    staleTime: 1000 * 60 * 1, // 60 sec
  })

export const qrCodeQueryOptions = (waybill: string) =>
  queryOptions({
    queryKey: ['qrCode', waybill],
    queryFn: ({ signal }) => getState().fetchQrCode({ waybill, signal }),
    staleTime: 1000 * 60 * 1, // 60 sec
  })
