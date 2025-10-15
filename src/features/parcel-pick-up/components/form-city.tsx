import { useQuery } from '@tanstack/react-query'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { cityNcrQueryOptions } from '../data/queryOptions'

interface FormProps {
  setSelectedCity: (value: string) => void
  selectedProvince: string
  selectedCity: string
}

export default function FormCity({
  selectedProvince,
  setSelectedCity,
  selectedCity,
}: FormProps) {
  const { data: cities } = useQuery(cityNcrQueryOptions(selectedProvince))

  return (
    <Select
      onValueChange={(value) => setSelectedCity(value)}
      defaultValue={selectedCity}
    >
      <SelectTrigger id='origin-province' className='w-full'>
        <SelectValue placeholder='Select City' />
      </SelectTrigger>
      <SelectContent>
        {cities?.map((city) => (
          <SelectItem key={city.id} value={city.id.toString()}>
            {city.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
