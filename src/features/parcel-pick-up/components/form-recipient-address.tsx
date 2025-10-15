import { useState } from 'react'
import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { recipientSchema } from '../data/schema'
import SelectBarangay from './form-barangay'
import SelectCity from './form-city'
import SelectProvince from './form-province'

export type FormValues = z.infer<typeof recipientSchema>

export default function FormRecipientAddress() {
  const {
    register,
    formState: { errors },
    setValue,
    getValues,
  } = useFormContext<FormValues>()
  const [selectedProvince, setSelectedProvince] = useState(
    getValues('recipient.provinceId') ?? ''
  )
  const [selectedCity, setSelectedCity] = useState(
    getValues('recipient.cityMunicipalityId') ?? ''
  )

  const setProvince = (value: string) => {
    setValue('recipient.provinceId', value)
    setSelectedProvince(value)
  }
  const setCityMun = (value: string) => {
    setValue('recipient.cityMunicipalityId', value)
    setSelectedCity(value)
  }
  const setBarangay = (value: string) => {
    setValue('recipient.barangayDistrictId', value)
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
          {errors.recipient?.provinceId && (
            <p className='text-xs text-red-500'>
              {errors.recipient.provinceId.message}
            </p>
          )}
        </div>
        <div className='flex flex-col space-y-1.5'>
          <Label htmlFor='cityMunicipality'>City/Municipality</Label>
          <SelectCity
            selectedProvince={selectedProvince}
            setSelectedCity={setCityMun}
            selectedCity={getValues('recipient.cityMunicipalityId')}
          />
          {errors.recipient?.cityMunicipalityId && (
            <p className='text-xs text-red-500'>
              {errors.recipient.cityMunicipalityId.message}
            </p>
          )}
        </div>
      </div>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='barangayDistrict'>Barangay/District</Label>
        <SelectBarangay
          selectedCity={selectedCity}
          selectedBarangayDistrict={getValues('recipient.barangayDistrictId')}
          setSelectedBarangayDistrict={setBarangay}
        />
        {errors.recipient?.barangayDistrictId && (
          <p className='text-xs text-red-500'>
            {errors.recipient.barangayDistrictId.message}
          </p>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='streetAddress'>Street Address</Label>
        <Input
          id='streetAddress'
          placeholder='Enter street address'
          {...register('recipient.streetAddress')}
        />
        {errors.recipient?.streetAddress && (
          <p className='text-xs text-red-500'>
            {errors.recipient.streetAddress.message}
          </p>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='otherLocationDetails'>Other Location Details</Label>
        <Textarea
          id='otherLocationDetails'
          placeholder='e.g. building, floor, unit'
          {...register('recipient.otherLocationDetails')}
        />
        {errors.recipient?.otherLocationDetails && (
          <p className='text-xs text-red-500'>
            {errors.recipient.otherLocationDetails.message}
          </p>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='name'>Recipient's Name</Label>
        <Input
          id='name'
          placeholder="Enter recipient's name"
          {...register('recipient.name')}
        />
        {errors.recipient?.name && (
          <p className='text-xs text-red-500'>
            {errors.recipient.name.message}
          </p>
        )}
      </div>
      <div className='space-y-2'>
        <Label htmlFor='mobileNumber'>Recipient's Mobile Number</Label>
        <Input
          id='mobileNumber'
          placeholder="Enter recipient's mobile number"
          {...register('recipient.mobileNumber')}
        />
        {errors.recipient?.mobileNumber && (
          <p className='text-xs text-red-500'>
            {errors.recipient.mobileNumber.message}
          </p>
        )}
      </div>
    </div>
  )
}
