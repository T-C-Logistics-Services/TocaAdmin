import Axios, { AxiosRequestConfig } from 'axios'
import { PaginationState } from '@tanstack/react-table'
import { create } from 'zustand'
import { Booking } from '@/features/bookings/data/schema'
import { Customer } from '@/features/customers/data/schema'
import { Driver } from '@/features/drivers/data/schema'
import { User } from '@/features/users/data/schema'

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
    shopName: string
    contactNumber: string
    provinceId: string
    cityMunicipalityId: string
    barangayDistrictId: string
    streetAddress: string
    otherLocationDetails: string
    isCompletedRegistration?: boolean
    avatar: string
  }
}

export interface PsgcResponse {
  id: number
  code: string
  name: string
  islandGroup: string
}

export interface CityNcrParam extends AxiosRequestConfig {
  id: string
}

export interface VehicleResponse {
  id: number
  vehicle: string
  lengthLimitCm: string
  widthLimitCm: string
  heightLimitCm: string
  weightLimitKg: string
  vehicleWithWeightLimit: string
}

export interface EstimateResponse {
  message: string
  distanceKm?: number
  baseFare?: string
  perKmRate?: string
  totalFee: number
}

export interface PaymentMethodResponse {
  id: number
  method: string
}

export interface ParcelPackageResponse {
  id: number
  package: string
  packageWithSize: string
  length: string
  width: string
  height: string
  maxWeightKg: string
  uom: string
  isCustom: boolean
}

export interface PayersResponse {
  id: number
  payer: string
}

export interface CreateBookingResponse {
  message: string
  booking: {
    id: number
    trackingNumber: string
    typeId: number
    type: string
    packageId: number
    senderAddressId: number
    recipientAddressId: number
    orderId: number
    customerId: number | null
    driverId: number | null
    statusId: number
    barcodeUrl: string
    qrcodeUrl: string
    createdAt: string
    updatedAt: string
    sender: {
      provinceId: number
      provinceName: string
      cityMunicipalityId: number
      cityMunicipalityName: string
      barangayDistrictId: number
      barangayDistrictName: string
      streetAddress: string
      otherLocationDetails: string
      name: string
      mobileNumber: string
    }
    recipient: {
      provinceId: number
      provinceName: string
      cityMunicipalityId: number
      cityMunicipalityName: string
      barangayDistrictId: number
      barangayDistrictName: string
      streetAddress: string
      otherLocationDetails: string
      name: string
      mobileNumber: string
    }
    order: {
      number: string
      deliveryDate: string | null
      deliveryFee: string
      paymentMethodId: number
      paidById: number
      payer: string
      statusId: number
      payItemOnDelivery: boolean | null
      itemAmount: string | null
      itemDescription: string | null
      pickUpTime: string | null
      totalAmount: string | null
    }
    package: {
      weightKg: string | null
      length: string | null
      width: string | null
      height: string | null
      vehicleId: number | null
      vehicle: string | null
      packageSizeId: number | null
      packageSize: string | null
      packageMaxWeightKg: string | null
      packageLength: string | null
      packageWidth: string | null
      packageHeight: string | null
      packageIsCustom: boolean | null
      packageUom: string | null
      packageWithSize: string | null
    }
  }
}

export interface CashOnDeliveryIdResponse {
  id: number
}

type QRBarcodeResponse = Blob

interface ApiState {
  login: ({ data }: AxiosRequestConfig) => Promise<LoginResponse>
  logout: () => Promise<void>
  setAuthHeader: (token: string) => void
  removeAuthHeader: () => void
  fetchUserDetails: ({
    signal,
  }: AxiosRequestConfig) => Promise<LoginResponse['user']>
  fetchHubs: ({ signal }: AxiosRequestConfig) => Promise<{ hubs: Hub[] }>
  fetchRoles: ({ signal }: AxiosRequestConfig) => Promise<{ roles: Role[] }>
  fetchVehicles: ({
    signal,
  }: AxiosRequestConfig) => Promise<{ vehicles: Vehicle[] }>
  fetchVehiclesWithDetails: ({
    signal,
  }: AxiosRequestConfig) => Promise<{ vehicles: VehicleResponse[] }>
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
  fetchBookings: ({
    pagination,
    signal,
  }: AxiosRequestConfig & { pagination: PaginationState }) => Promise<{
    bookings: Booking[]
    pagination: Pagination
  }>
  createBooking: ({ data }: AxiosRequestConfig) => Promise<void>
  updateBooking: ({
    id,
    data,
  }: AxiosRequestConfig & { id: string }) => Promise<void>
  deleteBooking: ({ id }: { id: string }) => Promise<void>
  assignBooking: ({
    bookingId,
    driverId,
  }: {
    bookingId: string
    driverId: string
  }) => Promise<void>
  fetchProvincesNcr: ({ signal }: AxiosRequestConfig) => Promise<PsgcResponse[]>
  fetchCitiesNcr: ({ id, signal }: CityNcrParam) => Promise<PsgcResponse[]>
  fetchBarangayDistrict: ({
    id,
    signal,
  }: CityNcrParam) => Promise<PsgcResponse[]>
  fetchPaymentMethods: ({ signal }: AxiosRequestConfig) => Promise<{
    bookingPaymentMethods: PaymentMethodResponse[]
  }>
  fetchPayers: ({ signal }: AxiosRequestConfig) => Promise<{
    bookingPayers: PayersResponse[]
  }>
  fetchParcelPackages: ({
    signal,
  }: AxiosRequestConfig) => Promise<ParcelPackageResponse[]>
  fetchEstimateParcelPickUp: ({
    signal,
  }: AxiosRequestConfig) => Promise<EstimateResponse>
  fetchEstimateOnDemandParcel: ({
    signal,
  }: AxiosRequestConfig) => Promise<EstimateResponse>
  createParcelPickUpBooking: ({
    data,
  }: AxiosRequestConfig) => Promise<CreateBookingResponse>
  createOnDemandParcelBooking: ({
    data,
  }: AxiosRequestConfig) => Promise<CreateBookingResponse>
  fetchCashOnDeliveryId: ({
    signal,
  }: AxiosRequestConfig) => Promise<CashOnDeliveryIdResponse>
  fetchBarcode: ({
    waybill,
    signal,
  }: {
    waybill: string
    signal?: AbortSignal
  }) => Promise<QRBarcodeResponse>
  fetchQrCode: ({
    waybill,
    signal,
  }: {
    waybill: string
    signal?: AbortSignal
  }) => Promise<QRBarcodeResponse>
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
  setAuthHeader: (token) => {
    if (authInterceptor) {
      axios.interceptors.request.eject(authInterceptor)
    }

    authInterceptor = axios.interceptors.request.use(function (config) {
      config.headers.Authorization = `Bearer ${token}`
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
    const response = await axios.get('/hubs', { signal })
    return response.data
  },
  fetchRoles: async ({ signal }) => {
    const response = await axios.get('/roles', { signal })
    return response.data
  },
  fetchVehicles: async ({ signal }) => {
    const response = await axios.get('/vehicles', { signal })
    return response.data
  },
  fetchUsers: async ({ pagination, signal }) => {
    const response = await axios.get('/users', {
      params: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      signal,
    })
    return response.data
  },
  createUser: async ({ data }) => {
    const response = await axios.post('/users', data)
    return response.data
  },
  updateUser: async ({ id, data }) => {
    const response = await axios.put(`/users/${id}`, data)
    return response.data
  },
  deleteUser: async ({ id }) => {
    const response = await axios.delete(`/users/${id}`)
    return response.data
  },
  fetchCustomers: async ({ pagination, signal }) => {
    const response = await axios.get('/customers', {
      params: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      signal,
    })
    return response.data
  },
  createCustomer: async ({ data }) => {
    const response = await axios.post('/customers', data)
    return response.data
  },
  updateCustomer: async ({ id, data }) => {
    const response = await axios.put(`/customers/${id}`, data)
    return response.data
  },
  deleteCustomer: async ({ id }) => {
    const response = await axios.delete(`/customers/${id}`)
    return response.data
  },
  fetchDrivers: async ({ pagination, signal }) => {
    const response = await axios.get('/drivers', {
      params: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      signal,
    })
    return response.data
  },
  createDriver: async ({ data }) => {
    const response = await axios.post('/drivers', data)
    return response.data
  },
  updateDriver: async ({ id, data }) => {
    const response = await axios.put(`/drivers/${id}`, data)
    return response.data
  },
  deleteDriver: async ({ id }) => {
    const response = await axios.delete(`/drivers/${id}`)
    return response.data
  },
  fetchBookings: async ({ pagination, signal }) => {
    const response = await axios.get('/bookings', {
      params: {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
      },
      signal,
    })
    return response.data
  },
  createBooking: async ({ data }) => {
    const response = await axios.post('/bookings', data)
    return response.data
  },
  updateBooking: async ({ id, data }) => {
    const response = await axios.put(`/bookings/${id}`, data)
    return response.data
  },
  deleteBooking: async ({ id }) => {
    const response = await axios.delete(`/bookings/${id}`)
    return response.data
  },
  assignBooking: async ({ bookingId, driverId }) => {
    const response = await axios.put(`/bookings/${bookingId}/driver`, {
      driverId,
    })
    return response.data
  },
  fetchProvincesNcr: async ({ signal }) => {
    const response = await axios.get('/provinces-ncr', { signal })
    return response.data
  },
  fetchCitiesNcr: async ({ id, signal }) => {
    const response = await axios.get(`/cities-ncr/${id}`, { signal })
    return response.data
  },
  fetchBarangayDistrict: async ({ id, signal }) => {
    const response = await axios.get(`/barangay-district/${id}`, { signal })
    return response.data
  },
  fetchPaymentMethods: async ({ signal }) => {
    const response = await axios.get('/bookings/payment-methods', { signal })
    return response.data
  },
  fetchPayers: async ({ signal }) => {
    const response = await axios.get('/bookings/payers', { signal })
    return response.data
  },
  fetchParcelPackages: async ({ signal }) => {
    const response = await axios.get('/parcel-pickup-packages', { signal })
    return response.data
  },
  fetchVehiclesWithDetails: async ({ signal }) => {
    const response = await axios.get('/vehicles', { signal })
    return response.data
  },
  fetchEstimateParcelPickUp: async ({ data, signal }) => {
    const response = await axios.post('/estimate-parcel-pick-up', data, {
      signal,
    })
    return response.data
  },
  fetchEstimateOnDemandParcel: async ({ data, signal }) => {
    const response = await axios.post('/estimate-on-demand-parcel', data, {
      signal,
    })
    return response.data
  },
  createParcelPickUpBooking: async ({ data }) => {
    const response = await axios.post('/bookings/parcel-pick-up', data)
    return response.data
  },
  createOnDemandParcelBooking: async ({ data }) => {
    const response = await axios.post('/bookings/on-demand-parcel', data)
    return response.data
  },
  fetchCashOnDeliveryId: async ({ signal }) => {
    const response = await axios.get('/bookings/cash-on-delivery-id', {
      signal,
    })
    return response.data
  },
  fetchBarcode: async ({ waybill, signal }) => {
    const response = await axios.get(`/barcode/${waybill}`, {
      signal,
      responseType: 'blob',
    })
    return response.data
  },
  fetchQrCode: async ({ waybill, signal }) => {
    const response = await axios.get(`/qrcode/${waybill}`, {
      signal,
      responseType: 'blob',
    })
    return response.data
  },
}))
