import { createFileRoute } from '@tanstack/react-router'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'
import { userQueryOptions } from '@/components/layout/data/queryOptions'

export const Route = createFileRoute('/_authenticated')({
  loader: ({ context: { queryClient } }) => {
    return {
      user: queryClient.ensureQueryData(userQueryOptions),
    }
  },
  component: AuthenticatedLayout,
})
