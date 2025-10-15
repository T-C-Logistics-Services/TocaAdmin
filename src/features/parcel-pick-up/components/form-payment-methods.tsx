import { useSuspenseQuery } from '@tanstack/react-query'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { paymentMethodsQueryOptions } from '../data/queryOptions'

interface FormProps {
  setSelectedPaymentMethod: (value: string) => void
  selectedPaymentMethod: string
}

export default function PaymentMethods({
  setSelectedPaymentMethod,
  selectedPaymentMethod,
}: FormProps) {
  const { data: paymentMethods } = useSuspenseQuery(paymentMethodsQueryOptions)

  return (
    <Select
      onValueChange={(value) => setSelectedPaymentMethod(value)}
      defaultValue={selectedPaymentMethod}
    >
      <SelectTrigger id='payment-method' className='w-full'>
        <SelectValue placeholder='Select Payment Method' />
      </SelectTrigger>
      <SelectContent>
        {paymentMethods?.bookingPaymentMethods.map((method) => (
          <SelectItem key={method.id} value={method.id.toString()}>
            {method.method}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
