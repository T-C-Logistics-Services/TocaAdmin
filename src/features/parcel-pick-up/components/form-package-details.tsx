import { useState } from 'react'
import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  estimateParcelPickUpQueryOptions,
  parcelPackageQueryOptions,
} from '../data/queryOptions'
import { packageSchema } from '../data/schema'
import SelectParcelSize from './form-parcel-size'

export type FormValues = z.infer<typeof packageSchema> & {
  sender: {
    provinceId: string
    cityMunicipalityId: string
  }
  recipient: {
    provinceId: string
    cityMunicipalityId: string
  }
}

export default function FormPackageDetails() {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<FormValues>()
  const { data: parcelSizes } = useQuery(parcelPackageQueryOptions)
  const [selectedParcelSize, setSelectedParcelSize] = useState<string>(
    getValues('package.packageSizeId') ?? ''
  )

  const { data } = useQuery(
    estimateParcelPickUpQueryOptions({
      originProvinceId: watch('sender.provinceId'),
      originCityId: watch('sender.cityMunicipalityId'),
      destinationProvinceId: watch('recipient.provinceId'),
      destinationCityId: watch('recipient.cityMunicipalityId'),
      packageSizeId: watch('package.packageSizeId'),
      weightKg: watch('package.weightKg'),
      length: watch('package.length'),
      width: watch('package.width'),
      height: watch('package.height'),
    })
  )

  const handleParcelSizeChange = (packageSizeId: string) => {
    setSelectedParcelSize(packageSizeId)
    setValue('package.packageSizeId', packageSizeId)
  }

  const isSelectedParcelSizeOwnPack = () =>
    parcelSizes?.find((size) => size.id.toString() === selectedParcelSize)
      ?.isCustom

  return (
    <div className='space-y-4'>
      <div className='flex flex-col space-y-1.5'>
        <Label htmlFor='province'>Parcel Size</Label>
        <SelectParcelSize
          setSelectedParcelSize={handleParcelSizeChange}
          selectedParcelSize={selectedParcelSize}
        />
        {errors.recipient?.provinceId && (
          <p className='text-xs text-red-500'>
            {errors.recipient.provinceId.message}
          </p>
        )}
      </div>
      <div className={isSelectedParcelSizeOwnPack() ? 'block' : 'hidden'}>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='weight'>Weight (kg)</Label>
            <Input
              id='weight'
              placeholder='Enter weight'
              type='number'
              step='0.01'
              {...register('package.weightKg')}
            />
            {errors?.package?.weightKg && (
              <p className='text-xs text-red-500'>
                {errors.package.weightKg.message}
              </p>
            )}
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div className='py-4'>
            <Label>Dimension (LxWxH)</Label>
          </div>
        </div>
        <div className='grid grid-cols-3 gap-4'>
          <div className='space-y-2'>
            <Label htmlFor='length'>Length (cm)</Label>
            <Input
              id='length'
              placeholder='Enter length'
              type='number'
              step='0.01'
              {...register('package.length')}
            />
            {errors?.package?.length && (
              <p className='text-xs text-red-500'>
                {errors.package.length.message}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='width'>Width (cm)</Label>
            <Input
              id='width'
              placeholder='Enter width'
              type='number'
              step='0.01'
              {...register('package.width')}
            />
            {errors?.package?.width && (
              <p className='text-xs text-red-500'>
                {errors.package.width.message}
              </p>
            )}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='height'>Height (cm)</Label>
            <Input
              id='height'
              placeholder='Enter height'
              type='number'
              step='0.01'
              {...register('package.height')}
            />
            {errors?.package?.height && (
              <p className='text-xs text-red-500'>
                {errors.package.height.message}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className='rounded-lg border border-gray-200 p-4'>
        <h3 className='mb-3 text-sm font-semibold text-gray-900'>
          Estimated Price
        </h3>
        <div className='space-y-2'>
          <div className='flex justify-between text-sm'>
            <span className='text-gray-600'>Shipping fee</span>
            <span className='font-medium'>₱ {data?.totalFee || '0.00'}</span>
          </div>

          <div className='border-t pt-2'>
            <div className='flex justify-between text-sm font-semibold'>
              <span>Total Estimated</span>
              <span className='text-blue-600'>
                ₱ {data?.totalFee || '0.00'}
              </span>
            </div>
          </div>
        </div>
        <p className='mt-3 text-xs text-gray-500'>
          Final price will be calculated based on actual measurements and
          destination
        </p>
      </div>
    </div>
  )
}
