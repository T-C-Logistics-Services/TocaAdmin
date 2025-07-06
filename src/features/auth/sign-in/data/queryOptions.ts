import { AxiosRequestConfig } from 'axios'
import { useApiStore } from '@/stores/apiStore'

const { getState } = useApiStore

export const loginOptions = {
  mutationFn: (values: AxiosRequestConfig) =>
    getState().login({ data: values.data }),
}
