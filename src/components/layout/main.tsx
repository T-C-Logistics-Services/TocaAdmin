import React from 'react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '../ui/card'

interface MainProps extends React.HTMLAttributes<HTMLElement> {
  fixed?: boolean
  ref?: React.Ref<HTMLElement>
}

export const Main = ({ fixed, className, children, ...props }: MainProps) => {
  return (
    <main
      className={cn(
        'peer-[.header-fixed]/header:mt-16',
        'px-4 py-6',
        fixed && 'fixed-main flex grow flex-col overflow-hidden',
        className
      )}
      {...props}
    >
      <Card className='gap-4'>
        <CardContent>{children}</CardContent>
      </Card>
    </main>
  )
}

Main.displayName = 'Main'
