import Axios, { AxiosRequestConfig } from 'axios'
import { PaginationState } from '@tanstack/react-table'
import { create } from 'zustand'
import { Customer } from '@/features/customers/data/schema'
import { Driver } from '@/features/drivers/data/schema'
import { User } from '@/features/users/data/schema'
import { useAuthStore } from './authStore'

const axios = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
})

let authInterceptor: number

export interface Hub {
  id: string
  hub: string
}

export interface Role {
  role: string
  name: string
}

export interface Vehicle {
  id: string
  vehicle: string
}

export interface Pagination {
  total: number
  page: number
  limit: number
  totalPages: number
}

export interface LoginResponse {
  token: string
  user: {
    firstName: string
    lastName: string
    email: string
    sub: string
    name: string
    avatar: string
  }
}

interface ApiState {
  login: ({ data }: AxiosRequestConfig) => Promise<LoginResponse>
  logout: () => Promise<void>
  setAuthHeader: () => void
  removeAuthHeader: () => void
  fetchUserDetails: ({
    signal,
  }: AxiosRequestConfig) => Promise<LoginResponse['user']>
  fetchHubs: ({ signal }: AxiosRequestConfig) => Promise<{ hubs: Hub[] }>
  fetchRoles: ({ signal }: AxiosRequestConfig) => Promise<{ roles: Role[] }>
  fetchVehicles: ({
    signal,
  }: AxiosRequestConfig) => Promise<{ vehicles: Vehicle[] }>
  fetchUsers: ({
    pagination,
    signal,
  }: AxiosRequestConfig & { pagination: PaginationState }) => Promise<{
    users: User[]
    pagination: Pagination
  }>
  createUser: ({ data }: AxiosRequestConfig) => Promise<void>
  updateUser: ({
    id,
    data,
  }: AxiosRequestConfig & { id: string }) => Promise<void>
  deleteUser: ({ id }: { id: string }) => Promise<void>
  fetchCustomers: ({
    pagination,
    signal,
  }: AxiosRequestConfig & { pagination: PaginationState }) => Promise<{
    customers: Customer[]
    pagination: Pagination
  }>
  createCustomer: ({ data }: AxiosRequestConfig) => Promise<void>
  updateCustomer: ({
    id,
    data,
  }: AxiosRequestConfig & { id: string }) => Promise<void>
  deleteCustomer: ({ id }: { id: string }) => Promise<void>
  fetchDrivers: ({
    pagination,
    signal,
  }: AxiosRequestConfig & { pagination: PaginationState }) => Promise<{
    drivers: Driver[]
    pagination: Pagination
  }>
  createDriver: ({ data }: AxiosRequestConfig) => Promise<void>
  updateDriver: ({
    id,
    data,
  }: AxiosRequestConfig & { id: string }) => Promise<void>
  deleteDriver: ({ id }: { id: string }) => Promise<void>
}

export const useApiStore = create<ApiState>()(() => ({
  login: async ({ data }) => {
    const response = await axios.post(`/login/admin`, data)
    return response.data
  },
  logout: async () => {
    try {
      await axios.get('/logout')
    } catch (error) {
      console.error('Failed to logout:', error)
    }
  },
  setAuthHeader: () => {
    authInterceptor = axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${useAuthStore.getState().auth.accessToken}`
      return config
    })
  },
  removeAuthHeader: () => {
    axios.interceptors.request.eject(authInterceptor)
  },
  fetchUserDetails: async ({ signal }) => {
    const response = await axios.get('/user', { signal })
    return response.data
  },
  fetchHubs: async ({ signal }) => {
    try {
      const response = await axios.get('/hubs', { signal })
      return response.data
    } catch (error) {
      console.error('Failed to fetch hubs:', error)
      return []
    }
  },
  fetchRoles: async ({ signal }) => {
    try {
      const response = await axios.get('/roles', { signal })
      return response.data
    } catch (error) {
      console.error('Failed to fetch roles:', error)
      return []
    }
  },
  fetchVehicles: async ({ signal }) => {
    try {
      const response = await axios.get('/vehicles', { signal })
      return response.data
    } catch (error) {
      console.error('Failed to fetch vehicles:', error)
      return []
    }
  },
  fetchUsers: async ({ pagination, signal }) => {
    try {
      const response = await axios.get('/users', {
        params: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
        signal,
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch users:', error)
      return []
    }
  },
  createUser: async ({ data }) => {
    try {
      const response = await axios.post('/users', data)
      return response.data
    } catch (error) {
      console.error('Failed to create user:', error)
      return []
    }
  },
  updateUser: async ({ id, data }) => {
    try {
      const response = await axios.put(`/users/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Failed to update user:', error)
      return []
    }
  },
  deleteUser: async ({ id }) => {
    try {
      const response = await axios.delete(`/users/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to delete user:', error)
      return []
    }
  },
  fetchCustomers: async ({ pagination, signal }) => {
    try {
      const response = await axios.get('/customers', {
        params: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
        signal,
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch customers:', error)
      return []
    }
  },
  createCustomer: async ({ data }) => {
    try {
      const response = await axios.post('/customers', data)
      return response.data
    } catch (error) {
      console.error('Failed to create customer:', error)
      return []
    }
  },
  updateCustomer: async ({ id, data }) => {
    try {
      const response = await axios.put(`/customers/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Failed to update customer:', error)
      return []
    }
  },
  deleteCustomer: async ({ id }) => {
    try {
      const response = await axios.delete(`/customers/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to delete customer:', error)
      return []
    }
  },
  fetchDrivers: async ({ pagination, signal }) => {
    try {
      const response = await axios.get('/drivers', {
        params: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
        signal,
      })
      return response.data
    } catch (error) {
      console.error('Failed to fetch drivers:', error)
      return []
    }
  },
  createDriver: async ({ data }) => {
    try {
      const response = await axios.post('/drivers', data)
      return response.data
    } catch (error) {
      console.error('Failed to create driver:', error)
      return []
    }
  },
  updateDriver: async ({ id, data }) => {
    try {
      const response = await axios.put(`/drivers/${id}`, data)
      return response.data
    } catch (error) {
      console.error('Failed to update driver:', error)
      return []
    }
  },
  deleteDriver: async ({ id }) => {
    try {
      const response = await axios.delete(`/drivers/${id}`)
      return response.data
    } catch (error) {
      console.error('Failed to delete driver:', error)
      return []
    }
  },
}))
