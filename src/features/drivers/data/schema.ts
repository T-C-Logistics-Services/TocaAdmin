import { z } from 'zod'

export const driverSchema = z.object({
  id: z.number(),
  authId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  sex: z.string(),
  dateOfBirth: z.string(), // Assuming string for simplicity, could be z.date()
  address: z.string(),
  photoUrl: z.string().url().optional().or(z.literal('')),
  licenseNumber: z.string(),
  licenseExpirationDate: z.string(), // Assuming string for simplicity, could be z.date()
  vehicleId: z.number(),
  contactNumber: z.string(),
  socialMediaAccount: z.string().optional().or(z.literal('')),
  contactPerson: z.string(),
  contactPersonRelationship: z.string(),
  contactPersonNumber: z.string(),
  email: z.string().email(),
})
export type Driver = z.infer<typeof driverSchema>
