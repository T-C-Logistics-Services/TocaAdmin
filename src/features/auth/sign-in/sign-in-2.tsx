import { TocaLogo } from '@/assets/toca-logo'
import { UserAuthForm } from './components/user-auth-form'

export default function SignIn2() {
  return (
    <div className='relative container grid h-svh w-full flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
      {/* Left panel with Toca theme, now with white background */}
      <div className='relative hidden h-full w-full flex-col items-center justify-center bg-[#FFCA41] p-10 lg:flex'>
        <div className='relative z-20 flex flex-col items-center justify-center space-y-4'>
          <TocaLogo className='h-auto w-[300px] fill-white!' />
        </div>
        {/* Placeholder for map and scooter graphics - simplified using div elements with colors */}
        <div className='absolute right-0 bottom-0 left-0 h-1/3 bg-[#FFDB7A] opacity-50' />
        <div className='absolute right-0 bottom-0 h-1/2 w-1/2 rounded-tl-full bg-[#FFCA41] opacity-60' />{' '}
        {/* Changed to yellowish color */}
      </div>
      <div className='lg:p-8'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
          <div className='flex flex-col space-y-2 text-left'>
            <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
            <p className='text-muted-foreground text-sm'>
              Enter your email and password below <br />
              to log into your account
            </p>
          </div>
          <UserAuthForm />
          <p className='text-muted-foreground px-8 text-center text-sm'>
            By clicking login, you agree to our{' '}
            <a
              href='/terms'
              className='hover:text-primary underline underline-offset-4'
            >
              Terms of Service
            </a>{' '}
            and{' '}
            <a
              href='/privacy'
              className='hover:text-primary underline underline-offset-4'
            >
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  )
}
