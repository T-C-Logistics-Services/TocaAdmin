import { useState } from 'react'
import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { senderSchema } from '../data/schema'
import SelectBarangay from './form-barangay'
import SelectCity from './form-city'
import SelectProvince from './form-province'

export type FormValues = z.infer<typeof senderSchema>

export default function FormSenderAddress() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<FormValues>()
  const [selectedProvince, setSelectedProvince] = useState(
    getValues('sender.provinceId') ?? ''
  )
  const [selectedCity, setSelectedCity] = useState(
    getValues('sender.cityMunicipalityId') ?? ''
  )

  const setProvince = (value: string) => {
    setValue('sender.provinceId', value)
    setSelectedProvince(value)
  }
  const setCityMun = (value: string) => {
    setValue('sender.cityMunicipalityId', value)
    setSelectedCity(value)
  }
  const setBarangay = (value: string) => {
    setValue('sender.barangayDistrictId', value)
  }

  return (
    <div className='space-y-4 text-start'>
      <div className='grid grid-cols-2 gap-4'>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='province'>Province</Label>
          <SelectProvince
            selectedProvince={selectedProvince}
            setSelectedProvince={setProvince}
          />
          {errors?.sender?.provinceId && (
            <p className='text-xs text-red-500'>
              {errors.sender.provinceId.message}
            </p>
          )}
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='cityMunicipality'>City/Municipality</Label>
          <SelectCity
            selectedProvince={selectedProvince}
            selectedCity={getValues('sender.cityMunicipalityId')}
            setSelectedCity={setCityMun}
          />
          {errors?.sender?.cityMunicipalityId && (
            <p className='text-xs text-red-500'>
              {errors.sender.cityMunicipalityId.message}
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='barangayDistrict'>Barangay/District</Label>
        <SelectBarangay
          selectedCity={selectedCity}
          selectedBarangayDistrict={getValues('sender.barangayDistrictId')}
          setSelectedBarangayDistrict={setBarangay}
        />
        {errors.sender?.barangayDistrictId?.message && (
          <p className='text-xs text-red-500'>
            {errors.sender.barangayDistrictId.message}
          </p>
        )}
      </div>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='streetAddress'>Street Address</Label>
        <Input
          id='streetAddress'
          placeholder='Enter street address'
          {...register('sender.streetAddress')}
        />
        {errors.sender?.streetAddress && (
          <p className='text-xs text-red-500'>
            {errors.sender.streetAddress.message}
          </p>
        )}
      </div>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='otherLocationDetails'>
          Other Location Details (Optional)
        </Label>
        <Textarea
          id='otherLocationDetails'
          placeholder='Enter other location details'
          {...register('sender.otherLocationDetails')}
        />
      </div>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='senderName'>Sender Name</Label>
        <Input
          id='senderName'
          placeholder='Enter sender name'
          {...register('sender.name')}
        />
        {errors.sender?.name && (
          <p className='text-xs text-red-500'>{errors.sender.name.message}</p>
        )}
      </div>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='senderMobileNumber'>Sender Mobile Number</Label>
        <Input
          id='senderMobileNumber'
          placeholder='Enter sender mobile number'
          {...register('sender.mobileNumber')}
        />
        {errors.sender?.mobileNumber && (
          <p className='text-xs text-red-500'>
            {errors.sender.mobileNumber.message}
          </p>
        )}
      </div>
    </div>
  )
}
