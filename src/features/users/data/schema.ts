import { z } from 'zod'

export const userSchema = z.object({
  id: z.number(),
  authId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  address: z.string(),
  accountNumber: z.string(),
  hubId: z.number(),
  contactNumber: z.string(),
  hub: z.string(),
  email: z.string(),
  role: z.string(),
  roleName: z.string(),
})
export type User = z.infer<typeof userSchema>
