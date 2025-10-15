import { useQuery } from '@tanstack/react-query'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { barangayDistrictQueryOptions } from '../data/queryOptions'

interface FormProps {
  setSelectedBarangayDistrict: (value: string) => void
  selectedCity: string
  selectedBarangayDistrict: string
}

export default function FormBarangay({
  selectedCity,
  selectedBarangayDistrict,
  setSelectedBarangayDistrict,
}: FormProps) {
  const { data: barangays } = useQuery(
    barangayDistrictQueryOptions(selectedCity)
  )

  return (
    <Select
      onValueChange={(value) => setSelectedBarangayDistrict(value)}
      defaultValue={selectedBarangayDistrict}
    >
      <SelectTrigger id='origin-province' className='w-full'>
        <SelectValue placeholder='Select Barangay/District' />
      </SelectTrigger>
      <SelectContent>
        {barangays?.map((barangay) => (
          <SelectItem key={barangay.id} value={barangay.id.toString()}>
            {barangay.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
