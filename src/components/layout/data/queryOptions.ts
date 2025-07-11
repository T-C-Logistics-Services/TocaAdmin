import { AxiosRequestConfig } from 'axios'
import { useApiStore } from '@/stores/apiStore'

export const userQueryOptions = {
  queryKey: ['user'],
  queryFn: ({ signal }: AxiosRequestConfig) =>
    useApiStore.getState().fetchUserDetails({ signal }),
}
