import { z } from 'zod'

export const customerSchema = z.object({
  id: z.number(),
  authId: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  shopName: z.string().nullable(),
  mainAddress: z.string().nullable(),
  secondaryAddress: z.string().nullable(),
  email: z.string(),
})
export type Customer = z.infer<typeof customerSchema>
