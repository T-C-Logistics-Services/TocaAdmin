import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { payersQueryOptions } from '../data/queryOptions'

interface FormProps {
  setSelectedPaymentMethod: (value: string) => void
  selectedPayer: string
}

export default function PaymentMethods({
  setSelectedPaymentMethod,
  selectedPayer,
}: FormProps) {
  const { data: paymentMethods } = useSuspenseQuery(payersQueryOptions)

  return (
    <Select
      onValueChange={(value) => setSelectedPaymentMethod(value)}
      defaultValue={selectedPayer}
    >
      <SelectTrigger id='payee' className='w-full'>
        <SelectValue placeholder='Select Payee' />
      </SelectTrigger>
      <SelectContent>
        {paymentMethods?.bookingPayers.map((method) => (
          <SelectItem key={method.id} value={method.id.toString()}>
            {method.payer}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}