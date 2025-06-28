import { useEffect, useState } from 'react'
import { useApiStore } from '../../../stores/apiStore'

interface User {
  id: string
  firstName: string
  lastName: string
  address: string
  accountNumber: string
  hubId: string
  role: string
  contactNumber: string
  email: string
  password: string
  hubName?: string
}

export const useUsers = () => {
  const { fetchHubs } = useApiStore()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const userData: User[] = [
          {
            id: 'USER-001',
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St, Anytown, USA',
            accountNumber: 'ACC123456',
            hubId: 'HUB001',
            role: 'Admin',
            contactNumber: '555-0123',
            email: 'john.doe@example.com',
            password: 'securepass123',
            hubName: '1',
          },
          {
            id: 'USER-002',
            firstName: 'Jane',
            lastName: 'Smith',
            address: '456 Oak Ave, Somewhere, USA',
            accountNumber: 'ACC654321',
            hubId: 'HUB002',
            role: 'User',
            contactNumber: '555-0456',
            email: 'jane.smith@example.com',
            password: 'password456',
            hubName: '2',
          },
        ]
        setUsers(userData)
      } catch (error) {
        console.error('Failed to load user data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [fetchHubs])

  return { users, loading }
}
