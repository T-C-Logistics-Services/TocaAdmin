import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { provinceNcrQueryOptions } from '../data/queryOptions'

interface FormProps {
  setSelectedProvince: (value: string) => void
  selectedProvince: string
}

export default function FormProvince({
  setSelectedProvince,
  selectedProvince,
}: FormProps) {
  const { data: provinces } = useSuspenseQuery(provinceNcrQueryOptions)

  return (
    <Select
      onValueChange={(value) => setSelectedProvince(value)}
      defaultValue={selectedProvince}
    >
      <SelectTrigger id='origin-province' className='w-full'>
        <SelectValue placeholder='Select Province' />
      </SelectTrigger>
      <SelectContent>
        {provinces?.map((province) => (
          <SelectItem key={province.id} value={province.id.toString()}>
            {province.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
