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

export const driverQueryOptions = ({
  pagination,
}: {
  pagination: PaginationState
}) =>
  queryOptions({
    queryKey: ['drivers', pagination],
    queryFn: ({ signal }) => getState().fetchDrivers({ pagination, signal }),
    placeholderData: keepPreviousData,
  })

export const createDriverOptions = {
  mutationFn: (values: AxiosRequestConfig) =>
    getState().createDriver({ data: values.data }),
}

export const updateDriverOptions = {
  mutationFn: (values: AxiosRequestConfig & { id: string }) =>
    getState().updateDriver({ id: values.id, data: values.data }),
}

export const deleteDriverOptions = {
  mutationFn: (values: { id: string }) =>
    getState().deleteDriver({ id: values.id }),
}
