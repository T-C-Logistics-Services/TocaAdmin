import { z } from 'zod'

export const customerSchema = z.object({
  id: z.number(),
  authId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  shopName: z.string(),
  mainAddress: z.string(),
  secondaryAddress: z.string(),
  email: z.string(),
})
export type Customer = z.infer<typeof customerSchema>
