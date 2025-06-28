import { AxiosRequestConfig } from 'axios'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'
import { useApiStore } from '@/stores/apiStore'

const { getState } = useApiStore

export const customerQueryOptions = ({
  pagination,
}: {
  pagination: PaginationState
}) =>
  queryOptions({
    queryKey: ['customers', pagination],
    queryFn: ({ signal }) => getState().fetchCustomers({ pagination, signal }),
    placeholderData: keepPreviousData,
  })

export const createCustomerOptions = {
  mutationFn: (values: AxiosRequestConfig) =>
    getState().createCustomer({ data: values.data }),
}

export const updateCustomerOptions = {
  mutationFn: (values: AxiosRequestConfig & { id: string }) =>
    getState().updateCustomer({ id: values.id, data: values.data }),
}

export const deleteCustomerOptions = {
  mutationFn: (values: { id: string }) =>
    getState().deleteCustomer({ id: values.id }),
}
