import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useDrivers } from '../context/drivers-context'

export function DriversPrimaryButtons() {
  const { setOpen } = useDrivers()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>Create</span>
        <IconPlus size={18} />
      </Button>
    </div>
  )
}
