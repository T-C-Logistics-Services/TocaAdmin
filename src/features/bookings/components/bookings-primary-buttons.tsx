import { IconChevronDown } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { useNavigate } from '@tanstack/react-router'

export function BookingsPrimaryButtons() {
  const navigate = useNavigate()

  const handleNavigation = (path: string) => {
    navigate({ to: path })
  }

  return (
    <div className='flex gap-2'>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className='space-x-1'>
            <span>Create Booking</span>
            <IconChevronDown size={18} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem onClick={() => handleNavigation('/on-demand-parcel')}>
            On-demand Parcel
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleNavigation('/parcel-pick-up')}>
            Parcel Pick-up
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
