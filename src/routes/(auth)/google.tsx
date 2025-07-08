import { z } from 'zod'
import { createFileRoute } from '@tanstack/react-router'
import Google from '@/features/auth/google'

const querySchema = z.object({
  c: z.string().catch(''),
})

export const Route = createFileRoute('/(auth)/google')({
  validateSearch: (search) => querySchema.parse(search),
  component: Google,
})
