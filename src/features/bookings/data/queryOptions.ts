import { AxiosRequestConfig } from 'axios'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'
import { useApiStore } from '@/stores/apiStore'

const { getState } = useApiStore

export const vehicleQueryOptions = queryOptions({
  queryKey: ['vehicles'],
  queryFn: ({ signal }) => getState().fetchVehicles({ signal }),
  staleTime: 1000 * 60 * 10, // 10 minutes
})

export const bookingQueryOptions = ({
  pagination,
}: {
  pagination: PaginationState
}) =>
  queryOptions({
    queryKey: ['bookings', pagination],
    queryFn: ({ signal }) => getState().fetchBookings({ pagination, signal }),
    placeholderData: keepPreviousData,
  })

export const createBookingOptions = {
  mutationFn: (values: AxiosRequestConfig) =>
    getState().createBooking({ data: values.data }),
}

export const updateBookingOptions = {
  mutationFn: (values: AxiosRequestConfig & { id: string }) =>
    getState().updateBooking({ id: values.id, data: values.data }),
}

export const deleteBookingOptions = {
  mutationFn: (values: { id: string }) =>
    getState().deleteBooking({ id: values.id }),
}
