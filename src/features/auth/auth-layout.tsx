import React from 'react'
import { TocaLogoIcon } from '@/assets/toca-logo-icon'

interface Props {
  children: React.ReactNode
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <TocaLogoIcon className='mr-2 h-8! w-8!' />
          <h3 className='text-center text-2xl font-bold'>Toca Admin</h3>
        </div>
        {children}
      </div>
    </div>
  )
}
