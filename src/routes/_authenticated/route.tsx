import { createFileRoute } from '@tanstack/react-router'
import { useApiStore } from '@/stores/apiStore'
import { useAuthStore } from '@/stores/authStore'
import { AuthenticatedLayout } from '@/components/layout/authenticated-layout'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async () => {
    const { accessToken, user, setUser } = useAuthStore.getState().auth
    if (accessToken && !user) {
      const user = await useApiStore.getState().fetchUserDetails()
      if (user) {
        setUser(user)
      }
    }
  },
  component: AuthenticatedLayout,
})
