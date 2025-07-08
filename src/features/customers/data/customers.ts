import { useEffect, useState } from 'react'
import { useApiStore } from '../../../stores/apiStore'

interface Customer {
  id: string
  authId: string
  firstName: string
  lastName: string
  shopName: string
  mainAddress: string
  secondaryAddress: string
  email: string
  password: string
}

export const useCustomers = () => {
  const { fetchHubs } = useApiStore()
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      try {
        const customerData: Customer[] = [
          {
            id: 'CUST-001',
            authId: 'AUTH-001',
            firstName: 'Alice',
            lastName: 'Johnson',
            shopName: "Alice's Wonderland",
            mainAddress: '789 Pine St, Wonderland, USA',
            secondaryAddress: '101 Elm St, Wonderland, USA',
            email: '',
            password: '',
          },
          {
            id: 'CUST-002',
            authId: 'AUTH-002',
            firstName: 'Bob',
            lastName: 'Williams',
            shopName: "Bob's Burgers",
            mainAddress: '321 Cedar Ln, Burgerland, USA',
            secondaryAddress: '202 Maple Ave, Burgerland, USA',
            email: '',
            password: '',
          },
        ]
        setCustomers(customerData)
      } catch (error) {
        console.error('Failed to load customer data:', error)
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [fetchHubs])

  return { customers, loading }
}
