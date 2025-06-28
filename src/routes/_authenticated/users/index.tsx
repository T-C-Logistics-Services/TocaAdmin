import { createFileRoute } from '@tanstack/react-router'
import Users from '@/features/users'
import {
  hubQueryOptions,
  roleQueryOptions,
} from '@/features/users/data/queryOptions'

export const Route = createFileRoute('/_authenticated/users/')({
  component: Users,
  loader: ({ context: { queryClient } }) => {
    return {
      hubs: queryClient.ensureQueryData(hubQueryOptions),
      roles: queryClient.ensureQueryData(roleQueryOptions),
    }
  },
})
