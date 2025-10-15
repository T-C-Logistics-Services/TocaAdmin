import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { paymentSchema } from '../data/schema'
import SelectFormPaymentMethods from './form-payment-methods'

export type FormValues = z.infer<typeof paymentSchema>

export default function FormPaymentDetails() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<FormValues>()

  const setPaymentMethod = (value: string) => {
    setValue('payment.paymentMethodId', value)
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='paymentMethodId'>Mode of Payment</Label>
        <SelectFormPaymentMethods
          selectedPaymentMethod={getValues('payment.paymentMethodId')}
          setSelectedPaymentMethod={setPaymentMethod}
        />
        {errors?.payment?.paymentMethodId && (
          <p className='text-xs text-red-500'>
            {errors.payment.paymentMethodId.message}
          </p>
        )}
      </div>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='deliveryDate'>Delivery Date</Label>
        <Input
          id='deliveryDate'
          placeholder='Select delivery date'
          type='date'
          {...register('payment.deliveryDate')}
        />
        {errors?.payment?.deliveryDate && (
          <p className='text-xs text-red-500'>
            {errors.payment.deliveryDate.message}
          </p>
        )}
      </div>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='pickUpTime'>Pick-up time</Label>
        <Input
          id='pickUpTime'
          placeholder='Select pick up time'
          type='time'
          {...register('payment.pickUpTime')}
        />
        {errors?.payment?.pickUpTime && (
          <p className='text-xs text-red-500'>
            {errors.payment.pickUpTime.message}
          </p>
        )}
      </div>
    </div>
  )
}
