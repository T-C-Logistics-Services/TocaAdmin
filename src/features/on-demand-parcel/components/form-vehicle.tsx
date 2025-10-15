import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { vehiclesQueryOptions } from '../data/queryOptions'

interface FormProps {
  setSelectedVehicle: (value: string) => void
  selectedVehicle: string
}

export default function VehicleSelection({
  setSelectedVehicle,
  selectedVehicle,
}: FormProps) {
  const { data: vehicles } = useSuspenseQuery(vehiclesQueryOptions)

  return (
    <Select
      onValueChange={(value) => setSelectedVehicle(value)}
      defaultValue={selectedVehicle}
    >
      <SelectTrigger id='vehicle' className='w-full'>
        <SelectValue placeholder='Select Vehicle' />
      </SelectTrigger>
      <SelectContent>
        {vehicles?.vehicles.map((vehicle) => (
          <SelectItem key={vehicle.id} value={vehicle.id.toString()}>
            {vehicle.vehicleWithWeightLimit}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
