import React from 'react'
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@radix-ui/react-popover'
import { Command, CommandList, CommandGroup, CommandItem } from 'cmdk'
import { CheckIcon } from 'lucide-react'
import { TocaLogoIcon } from '@/assets/toca-logo-icon'
import { useRoleStore } from '@/stores/roleStore'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
}

const roles = [
  {
    value: 'finance',
    label: 'Toca Finance',
  },
  {
    value: 'admin',
    label: 'Toca Admin',
  },
  {
    value: 'superadmin',
    label: 'Toca Super Admin',
  },
]

export default function AuthLayout({ children }: Props) {
  const [open, setOpen] = React.useState(false)
  const { role, setSelectedRole } = useRoleStore()

  return (
    <div className='container grid h-svh max-w-none items-center justify-center'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-2 py-8 sm:w-[480px] sm:p-8'>
        <div className='mb-4 flex items-center justify-center'>
          <TocaLogoIcon className='mr-2 h-8! w-8!' />
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <h1 className='text-xl font-medium hover:cursor-pointer'>
                {roles.find((r) => r.value === role)?.label}
              </h1>
            </PopoverTrigger>
            <PopoverContent className='mt-2 w-[200px] border bg-white'>
              <Command>
                <CommandList>
                  <CommandGroup>
                    {roles.map((r) => (
                      <CommandItem
                        className='hover:bg-primary p-1.5 py-2 font-bold'
                        key={r.value}
                        value={r.value}
                        onSelect={(currentValue) => {
                          setSelectedRole(currentValue)
                          setOpen(false)
                        }}
                      >
                        <CheckIcon
                          className={cn(
                            'mx-2 inline-block h-5 w-5',
                            r?.value === role ? 'opacity-100' : 'opacity-0'
                          )}
                        />
                        {r.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
        {children}
      </div>
    </div>
  )
}
