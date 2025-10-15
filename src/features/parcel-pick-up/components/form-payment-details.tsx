import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { paymentSchema } from '../data/schema'
import SelectFormPayer from './form-payers'
import SelectFormPaymentMethods from './form-payment-methods'

export type FormValues = z.infer<typeof paymentSchema>

export default function FormPaymentDetails() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
    watch,
  } = useFormContext<FormValues>()

  const setPayer = (value: string) => {
    setValue('payment.paidById', value)
  }

  const setPaymentMethod = (value: string) => {
    setValue('payment.paymentMethodId', value)
  }

  const isPayItemOnDeliveryChecked = watch('payment.payItemOnDelivery')

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor=''>Payee</Label>
        <SelectFormPayer
          selectedPayer={getValues('payment.paidById')}
          setSelectedPaymentMethod={setPayer}
        />
        {errors?.payment?.paidById && (
          <p className='text-xs text-red-500'>
            {errors.payment.paidById.message}
          </p>
        )}
      </div>
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
      <div className='flex items-center space-x-2'>
        <Checkbox
          id='payItemOnDelivery'
          onCheckedChange={(checked) => {
            setValue('payment.payItemOnDelivery', Boolean(checked))
          }}
        />
        <Label htmlFor='payItemOnDelivery'>Cash on Delivery</Label>
      </div>
      <div
        className={
          isPayItemOnDeliveryChecked ? 'flex flex-col space-y-4' : 'hidden'
        }
      >
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='itemAmount'>Item Amount</Label>
          <Input
            id='itemAmount'
            placeholder='Enter item amount'
            type='number'
            {...register('payment.itemAmount')}
          />
          {errors?.payment?.itemAmount && (
            <p className='text-xs text-red-500'>
              {errors.payment.itemAmount.message}
            </p>
          )}
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='itemDescription'>Item Description</Label>
          <Textarea
            id='itemDescription'
            placeholder='Enter item description'
            {...register('payment.itemDescription')}
          />
          {errors?.payment?.itemDescription && (
            <p className='text-xs text-red-500'>
              {errors.payment.itemDescription.message}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
