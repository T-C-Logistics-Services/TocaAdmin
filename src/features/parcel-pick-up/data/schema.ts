import { z } from 'zod'

const addressSchema = z.object({
  provinceId: z.string().min(1, 'Province is required'),
  cityMunicipalityId: z.string().min(1, 'City/Municipality is required'),
  barangayDistrictId: z.string().min(1, 'Barangay/District is required'),
  streetAddress: z.string().min(1, 'Street address is required'),
  otherLocationDetails: z.string().optional(),
  name: z.string().min(1, 'Sender name is required'),
  mobileNumber: z.string().min(1, 'Sender mobile number is required'),
})

export const senderSchema = z.object({
  sender: addressSchema,
})

export const recipientSchema = z.object({
  recipient: addressSchema,
})

export const packageSchema = z.object({
  package: z.object({
    packageSizeId: z.coerce.string(),
    weightKg: z.coerce.string().optional(),
    length: z.coerce.string().optional(),
    width: z.coerce.string().optional(),
    height: z.coerce.string().optional(),
  }),
})

export const paymentSchema = z.object({
  payment: z.object({
    paidById: z.string().min(1, 'Payee is required'),
    paymentMethodId: z.string().min(1, 'Payment method is required'),
    payItemOnDelivery: z.boolean().optional(),
    itemAmount: z.coerce.string().optional(),
    itemDescription: z.string().optional(),
  }),
})
