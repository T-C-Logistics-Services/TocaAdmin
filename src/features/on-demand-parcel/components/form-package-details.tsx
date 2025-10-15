import { z } from 'zod'
import { useFormContext } from 'react-hook-form'
import { useQuery } from '@tanstack/react-query'
import { Label } from '@/components/ui/label'
import { estimateOnDemandParcelQueryOptions } from '../data/queryOptions'
import { packageSchema } from '../data/schema'
import VehicleSelection from './form-vehicle'

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
    formState: { errors },
    watch,
    setValue,
    getValues,
  } = useFormContext<FormValues>()

  const { data } = useQuery(
    estimateOnDemandParcelQueryOptions({
      originProvinceId: watch('sender.provinceId'),
      originCityId: watch('sender.cityMunicipalityId'),
      destinationProvinceId: watch('recipient.provinceId'),
      destinationCityId: watch('recipient.cityMunicipalityId'),
      vehicleId: watch('package.vehicleId'),
    })
  )

  const setVehicle = (value: string) => {
    setValue('package.vehicleId', value)
  }

  return (
    <div className='space-y-4'>
      <div className='space-y-2'>
        <Label htmlFor='vehicleId'>Vehicle</Label>
        <VehicleSelection
          selectedVehicle={getValues('package.vehicleId') || ''}
          setSelectedVehicle={setVehicle}
        />
        {errors?.package?.vehicleId && (
          <p className='text-xs text-red-500'>
            {errors.package.vehicleId.message}
          </p>
        )}
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
