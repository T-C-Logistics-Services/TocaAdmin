import { AxiosRequestConfig } from 'axios'
import { keepPreviousData, queryOptions } from '@tanstack/react-query'
import { PaginationState } from '@tanstack/react-table'
import { useApiStore } from '@/stores/apiStore'

const { getState } = useApiStore

export const hubQueryOptions = queryOptions({
  queryKey: ['hubs'],
  queryFn: ({ signal }) => getState().fetchHubs({ signal }),
  staleTime: 1000 * 60 * 10, // 10 minutes
})

export const roleQueryOptions = queryOptions({
  queryKey: ['roles'],
  queryFn: ({ signal }) => getState().fetchRoles({ signal }),
  staleTime: 1000 * 60 * 10, // 10 minutes
})

export const userQueryOptions = ({
  pagination,
}: {
  pagination: PaginationState
}) =>
  queryOptions({
    queryKey: ['users', pagination],
    queryFn: ({ signal }) => getState().fetchUsers({ pagination, signal }),
    placeholderData: keepPreviousData,
  })

export const createUserOptions = {
  mutationFn: (values: AxiosRequestConfig) =>
    getState().createUser({ data: values.data }),
}

export const updateUserOptions = {
  mutationFn: (values: AxiosRequestConfig & { id: string }) =>
    getState().updateUser({ id: values.id, data: values.data }),
}

export const deleteUserOptions = {
  mutationFn: (values: { id: string }) =>
    getState().deleteUser({ id: values.id }),
}
