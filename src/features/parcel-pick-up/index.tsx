import { useEffect, useState } from 'react'
import z from 'zod'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { CreateBookingResponse } from '@/stores/apiStore'
import { useAuthStore } from '@/stores/authStore'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { defineStepper } from '@/components/stepper'
import FormComplete from './components/form-complete'
import FormPackageDetails from './components/form-package-details'
import FormPaymentDetails from './components/form-payment-details'
import FormRecipientAddress from './components/form-recipient-address'
import FormSenderAddress from './components/form-sender-address'
import { createParcelPickUpOptions } from './data/queryOptions'
import {
  packageSchema,
  paymentSchema,
  recipientSchema,
  senderSchema,
} from './data/schema'

const { useStepper, steps, utils } = defineStepper(
  { id: 'start', label: 'Start', schema: z.any() },
  {
    id: 'sender-address',
    label: 'Sender Address',
    schema: senderSchema,
  },
  {
    id: 'recipient-address',
    label: 'Recipient Address',
    schema: recipientSchema,
  },
  {
    id: 'package-details',
    label: 'Package Details',
    schema: packageSchema,
  },
  {
    id: 'payment-details',
    label: 'Payment Details',
    schema: paymentSchema,
  },
  { id: 'success', label: 'Success', schema: z.any() }
)

export function ParcelPickUp() {
  const { user } = useAuthStore.getState().auth
  const stepper = useStepper()
  const currentIndex = utils.getIndex(stepper.current.id)
  const [createdBooking, setCreatedBooking] = useState<
    CreateBookingResponse['booking'] | undefined
  >()

  const form = useForm({
    mode: 'onTouched',
    resolver: zodResolver(stepper.current.schema),
  })

  const { mutateAsync: mutateAsyncCreateBooking, isPending } = useMutation(
    createParcelPickUpOptions
  )

  const onSubmit = async (values: z.infer<typeof stepper.current.schema>) => {
    // biome-ignore lint/suspicious/noConsoleLog: <We want to log the form values>
    console.log(`Form values for step ${stepper.current.id}:`, values)

    if (stepper.current.id === 'payment-details') {
      console.log('create booking')
      console.log(form.getValues())
      const response = await mutateAsyncCreateBooking({
        data: form.getValues(),
      })
      if (response) {
        setCreatedBooking(response.booking)
        stepper.next()
      }
    } else {
      stepper.next()
    }
  }

  useEffect(() => {
    form.reset({
      sender: {
        provinceId: String(user?.provinceId) || '',
        cityMunicipalityId: String(user?.cityMunicipalityId) || '',
        barangayDistrictId: String(user?.barangayDistrictId) || '',
        streetAddress: user?.streetAddress || '',
        otherLocationDetails: user?.otherLocationDetails || '',
        name: user?.name || '',
        mobileNumber: user?.contactNumber || '',
      },
    })
  }, [user, form])

  return (
    <>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='flex flex-1 flex-col gap-4 px-4 py-8 xl:mx-auto xl:max-w-1/2'>
          {/* Form Content */}
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              {stepper.current.id === 'start' ? (
                <div className='text-center'>
                  <h2 className='mb-4 text-2xl font-semibold'>
                    Parcel Pick-up Request
                  </h2>
                  <p className='text-muted-foreground mb-6'>
                    Ready to send a package? We'll guide you through the
                    process.
                  </p>
                  <Button onClick={stepper.next}>Start Now</Button>
                </div>
              ) : (
                <>
                  <div
                    className={`flex justify-between ${stepper.isLast ? 'hidden' : ''}`}
                  >
                    <h2 className='mb-6 text-2xl font-semibold'>
                      {steps[currentIndex].label}
                    </h2>
                    <div className='flex items-center gap-2'>
                      <span className='text-muted-foreground text-sm'>
                        Step {currentIndex} of {steps.length - 1}
                      </span>
                    </div>
                  </div>

                  <div className='space-y-4'>
                    {stepper.switch({
                      'sender-address': () => <FormSenderAddress />,
                      'recipient-address': () => <FormRecipientAddress />,
                      'package-details': () => <FormPackageDetails />,
                      'payment-details': () => <FormPaymentDetails />,
                      success: () => <FormComplete booking={createdBooking} />,
                    })}
                    <div
                      className={`flex justify-end gap-4 ${stepper.isLast ? 'hidden' : ''}`}
                    >
                      <Button
                        type='button'
                        variant='secondary'
                        onClick={stepper.prev}
                        disabled={stepper.isFirst || isPending}
                      >
                        Back
                      </Button>
                      <Button type='submit' disabled={isPending}>
                        {isPending ? (
                          <>
                            <div className='mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent'></div>
                            Processing...
                          </>
                        ) : stepper.isLast ? (
                          'Complete'
                        ) : (
                          'Next'
                        )}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </form>
          </FormProvider>
        </div>
      </Main>
    </>
  )
}
