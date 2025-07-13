import { z } from 'zod'

export const driverSchema = z.object({
  id: z.number(),
  authId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().nullable(),
  sex: z.string().nullable(),
  dateOfBirth: z.string().nullable(), // Assuming string for simplicity, could be z.date()
  address: z.string().nullable(),
  photoUrl: z.string().url().nullable().or(z.literal('')),
  licenseNumber: z.string().nullable(),
  licenseExpirationDate: z.string().nullable(), // Assuming string for simplicity, could be z.date()
  vehicleId: z.number().nullable(),
  contactNumber: z.string().nullable(),
  socialMediaAccount: z.string().nullable().optional().or(z.literal('')),
  contactPerson: z.string().nullable(),
  contactPersonRelationship: z.string().nullable(),
  contactPersonNumber: z.string().nullable(),
  email: z.string().email(),
})
export type Driver = z.infer<typeof driverSchema>
