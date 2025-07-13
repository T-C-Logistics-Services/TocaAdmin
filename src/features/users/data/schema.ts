import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  authId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  address: z.string().nullable(),
  accountNumber: z.string().nullable(),
  hubId: z.number().nullable(),
  contactNumber: z.string().nullable(),
  hub: z.string().nullable(),
  email: z.string(),
  role: z.string(),
  roleName: z.string(),
})
export type User = z.infer<typeof userSchema>
