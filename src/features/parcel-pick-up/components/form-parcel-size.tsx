import { useQuery } from '@tanstack/react-query'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { parcelPackageQueryOptions } from '../data/queryOptions'

interface FormProps {
  setSelectedParcelSize: (value: string) => void
  selectedParcelSize: string
}

export default function FormParcelSize({
  setSelectedParcelSize,
  selectedParcelSize,
}: FormProps) {
  const { data: parcelSizes } = useQuery(parcelPackageQueryOptions)

  return (
    <Select
      onValueChange={(value) => setSelectedParcelSize(value)}
      defaultValue={selectedParcelSize}
    >
      <SelectTrigger id='parcel-size' className='w-full'>
        <SelectValue placeholder='Select parcel size' />
      </SelectTrigger>
      <SelectContent>
        {parcelSizes?.map((size) => (
          <SelectItem key={size.id} value={size.id.toString()}>
            {size.packageWithSize}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
