import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { Vehicle } from '@/stores/apiStore'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Input } from '@/components/form/input'
import { Select } from '@/components/form/select'
import {
  createDriverOptions,
  updateDriverOptions,
  vehicleQueryOptions,
} from '../data/queryOptions'
import { Driver } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Driver
}

const formSchema = z.object({
  firstName: z.string().min(1, 'First name is required.'),
  lastName: z.string().min(1, 'Last name is required.'),
  age: z.coerce.number().min(1, 'Age is required.').nullable(),
  sex: z.string().min(1, 'Sex is required.').nullable(),
  dateOfBirth: z.string().min(1, 'Date of birth is required.').nullable(),
  address: z.string().min(1, 'Address is required.').nullable(),
  photoUrl: z.string().url().optional().or(z.literal('')).nullable(),
  licenseNumber: z.string().min(1, 'License number is required.').nullable(),
  licenseExpirationDate: z
    .string()
    .min(1, 'License expiration date is required.')
    .nullable(),
  vehicleId: z.coerce.string().min(1, 'Vehicle ID is required.').nullable(),
  contactNumber: z.string().min(1, 'Contact number is required.').nullable(),
  socialMediaAccount: z.string().optional().or(z.literal('')).nullable(),
  contactPerson: z.string().min(1, 'Contact person is required.').nullable(),
  contactPersonRelationship: z
    .string()
    .min(1, 'Contact person relationship is required.')
    .nullable(),
  contactPersonNumber: z
    .string()
    .min(1, 'Contact person number is required.')
    .nullable(),
  email: z.string().email('Invalid email format.'),
  password: z.string().min(6, 'Password must be at least 6 characters.'),
})
type DriversForm = z.infer<typeof formSchema>

export function DriversMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow

  const {
    data: { vehicles },
  } = useSuspenseQuery(vehicleQueryOptions)

  const { mutateAsync: mutateAsyncCreate } = useMutation(createDriverOptions)
  const { mutateAsync: mutateAsyncUpdate } = useMutation(updateDriverOptions)

  const form = useForm<DriversForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: currentRow ? currentRow.firstName : '',
      lastName: currentRow ? currentRow.lastName : '',
      age: currentRow ? currentRow.age : 0,
      sex: currentRow ? currentRow.sex : '',
      dateOfBirth: currentRow ? currentRow.dateOfBirth : '',
      address: currentRow ? currentRow.address : '',
      photoUrl: currentRow ? currentRow.photoUrl : '',
      licenseNumber: currentRow ? currentRow.licenseNumber : '',
      licenseExpirationDate: currentRow ? currentRow.licenseExpirationDate : '',
      vehicleId: currentRow ? String(currentRow.vehicleId) : '',
      contactNumber: currentRow ? currentRow.contactNumber : '',
      socialMediaAccount: currentRow ? currentRow.socialMediaAccount : '',
      contactPerson: currentRow ? currentRow.contactPerson : '',
      contactPersonRelationship: currentRow
        ? currentRow.contactPersonRelationship
        : '',
      contactPersonNumber: currentRow ? currentRow.contactPersonNumber : '',
      email: currentRow ? currentRow.email : '',
      password: '',
    },
  })

  const onSubmit = async (data: DriversForm) => {
    if (isUpdate) {
      await mutateAsyncUpdate({ data, id: currentRow.id.toString() })
    } else {
      await mutateAsyncCreate({ data })
    }

    onOpenChange(false)
    form.reset()
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Driver</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the driver by providing necessary info. '
              : 'Add a new driver by providing necessary info. '}
            Click save when you're done.
          </SheetDescription>
        </SheetHeader>

        <Form {...form}>
          <form
            id='drivers-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='flex-1 overflow-y-auto'
          >
            <div className='space-y-8 p-4'>
              <Input
                control={form.control}
                name='firstName'
                label='First Name'
                placeholder='Enter first name'
              />
              <Input
                control={form.control}
                name='lastName'
                label='Last Name'
                placeholder='Enter last name'
              />
              <Input
                control={form.control}
                name='age'
                label='Age'
                placeholder='Enter age'
                type='number'
              />
              <Select
                control={form.control}
                name='sex'
                label='Sex'
                placeholder='Select sex'
                options={[
                  { label: 'Male', value: 'Male' },
                  { label: 'Female', value: 'Female' },
                  { label: 'Other', value: 'Other' },
                ]}
              />
              <Input
                control={form.control}
                name='dateOfBirth'
                label='Date of Birth'
                placeholder='YYYY-MM-DD'
                type='date'
              />
              <Input
                control={form.control}
                name='address'
                label='Address'
                placeholder='Enter address'
              />
              <Input
                control={form.control}
                name='photoUrl'
                label='Photo URL'
                placeholder='Enter photo URL'
              />
              <Input
                control={form.control}
                name='licenseNumber'
                label='License Number'
                placeholder='Enter license number'
              />
              <Input
                control={form.control}
                name='licenseExpirationDate'
                label='License Expiration Date'
                placeholder='YYYY-MM-DD'
                type='date'
              />
              <Select
                control={form.control}
                name='vehicleId'
                label='Vehicle'
                placeholder='Select vehicle'
                options={vehicles.map((vehicle: Vehicle) => ({
                  value: vehicle.id,
                  label: vehicle.vehicle,
                }))}
              />
              <Input
                control={form.control}
                name='contactNumber'
                label='Contact Number'
                placeholder='Enter contact number'
              />
              <Input
                control={form.control}
                name='socialMediaAccount'
                label='Social Media Account'
                placeholder='Enter social media account'
              />
              <Input
                control={form.control}
                name='contactPerson'
                label='Contact Person'
                placeholder='Enter contact person name'
              />
              <Input
                control={form.control}
                name='contactPersonRelationship'
                label='Contact Person Relationship'
                placeholder='Enter relationship'
              />
              <Input
                control={form.control}
                name='contactPersonNumber'
                label='Contact Person Number'
                placeholder='Enter contact person number'
              />
              <Input
                control={form.control}
                name='email'
                label='Email'
                placeholder='Enter email'
              />
              <Input
                control={form.control}
                name='password'
                label='Password'
                type='password'
                placeholder='Enter password'
              />
            </div>
          </form>
        </Form>

        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='drivers-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
