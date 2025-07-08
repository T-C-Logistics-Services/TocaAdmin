import { HTMLAttributes, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from '@tanstack/react-router'
import { IconBrandGoogle } from '@tabler/icons-react'
import { useApiStore } from '@/stores/apiStore'
import { useAuthStore } from '@/stores/authStore'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { PasswordInput } from '@/components/password-input'
import { loginOptions } from '../data/queryOptions'
import { loginSchema } from '../data/schema'

type UserAuthFormProps = HTMLAttributes<HTMLFormElement>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const {
    mutateAsync: mutateAsyncLogin,
    isPending,
    isSuccess,
    data,
  } = useMutation(loginOptions)
  const { auth } = useAuthStore()
  const apiStore = useApiStore()
  const navigate = useNavigate()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  async function onSubmit(data: z.infer<typeof loginSchema>) {
    await mutateAsyncLogin({ data })
  }

  const setAccessToken = auth.setAccessToken
  const setUser = auth.setUser
  const setAuthHeader = apiStore.setAuthHeader

  useEffect(() => {
    if (isSuccess) {
      setAccessToken(data.token)
      setUser(data.user)
      setAuthHeader()

      navigate({ to: '/' })
    }
  }, [setAccessToken, setUser, setAuthHeader, isSuccess, data, navigate])

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('grid gap-3', className)}
        {...props}
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder='name@example.com' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='relative'>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder='********' {...field} />
              </FormControl>
              <FormMessage />
              <Link
                to='/forgot-password'
                className='text-muted-foreground absolute -top-0.5 right-0 text-sm font-medium hover:opacity-75'
              >
                Forgot password?
              </Link>
            </FormItem>
          )}
        />
        {/* {error && <p className='text-red-500'>{error}</p>} */}
        <Button className='mt-2' disabled={isPending}>
          Login
        </Button>

        <div className='relative my-2'>
          <div className='absolute inset-0 flex items-center'>
            <span className='w-full border-t' />
          </div>
          <div className='relative flex justify-center text-xs uppercase'>
            <span className='text-muted-foreground bg-white px-2'>
              Or continue with
            </span>
          </div>
        </div>

        <Button
          variant='outline'
          type='button'
          disabled={isPending}
          className='bg-white'
          onClick={() => {
            window.location.href = `${import.meta.env.VITE_API_URL}/google/admin`
          }}
        >
          <IconBrandGoogle className='h-4 w-4' /> Google
        </Button>
      </form>
    </Form>
  )
}
