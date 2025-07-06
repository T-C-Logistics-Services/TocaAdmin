import { create } from 'zustand'

interface RoleStore {
  role: string
  setSelectedRole: (roleValue: string) => void
}

export const useRoleStore = create<RoleStore>()((set) => ({
  role: 'finance',
  setSelectedRole: (role) => set(() => ({ role })),
}))
