import { z } from 'zod'

// Define a basic booking schema - you'll need to adjust this based on your actual booking data structure
export const bookingSchema = z.object({
  id: z.number(),
  trackingNumber: z.string(),
  typeId: z.number(),
  type: z.string(),
  orderId: z.number(),
  customerId: z.number(),
  driverId: z.number().nullable(),
  statusId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  sender: z.object({
    provinceId: z.number(),
    provinceName: z.string(),
    cityMunicipalityId: z.number(),
    cityMunicipalityName: z.string(),
    barangayDistrict: z.string(),
    streetAddress: z.string(),
    otherLocationDetails: z.string(),
    name: z.string(),
    mobileNumber: z.string(),
  }),
  recipient: z.object({
    provinceId: z.number(),
    provinceName: z.string(),
    cityMunicipalityId: z.number(),
    cityMunicipalityName: z.string(),
    barangayDistrict: z.string(),
    streetAddress: z.string(),
    otherLocationDetails: z.string(),
    name: z.string(),
    mobileNumber: z.string(),
  }),
  order: z.object({
    number: z.string(),
    deliveryDate: z.string(),
    deliveryFee: z.string(),
    paymentMethodId: z.number(),
    paidById: z.number(),
    payer: z.string(),
    statusId: z.number(),
  }),
  package: z.object({
    weightKg: z.string(),
    lengthCm: z.string(),
    widthCm: z.string(),
    heightCm: z.string(),
    vehicleId: z.number().nullable(),
    vehicle: z.string().nullable(),
  }),
})

export type Booking = z.infer<typeof bookingSchema>
