import { useEffect, useState } from 'react'
import { Link, useNavigate, useSearch } from '@tanstack/react-router'
import { useApiStore } from '@/stores/apiStore'
import { useAuthStore } from '@/stores/authStore'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from '@/components/ui/card'
import AuthLayout from '../auth-layout'

export default function Google() {
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const apiStore = useApiStore()
  const { c } = useSearch({ from: '/(auth)/google' })
  const setAccessToken = auth.setAccessToken
  const setUser = auth.setUser
  const setAuthHeader = apiStore.setAuthHeader
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const base64String = c
    if (c) {
      try {
        const decodedString = atob(base64String)
        const auth = JSON.parse(decodedString)
        if (!auth?.token || !auth?.user) {
          setIsError(true)
          setIsLoading(false)
          return
        }
        setAccessToken(auth.token)
        setUser(auth.user)
        setAuthHeader(auth.token)
        setIsError(false)
        setTimeout(() => {
          navigate({ to: '/' })
        }, 3000)
        setIsLoading(false)
      } catch (error) {
        console.error('Failed to decode or parse the query parameter', error)
        setIsLoading(false)
        setIsError(true)
      }
    }
  }, [
    c,
    setAccessToken,
    setUser,
    setAuthHeader,
    setIsError,
    setIsLoading,
    navigate,
  ])

  if (isLoading) return

  return (
    <AuthLayout>
      {isError ? (
        <Card className='gap-4'>
          <CardHeader>
            <CardTitle className='text-base tracking-tight'>
              Failed to sign in
            </CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent className=''>
            <div className='w-full'>Email is not registered.</div>
            <Link
              to='/sign-in'
              className='hover:text-primary underline underline-offset-4'
            >
              Sign in
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card className='gap-4'>
          <CardHeader>
            <CardTitle className='text-base tracking-tight'>
              Successfully logged in
            </CardTitle>
          </CardHeader>
          <CardContent className='text-sm'>Redirecting...</CardContent>
        </Card>
      )}
    </AuthLayout>
  )
}
