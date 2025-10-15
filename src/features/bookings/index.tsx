import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { BookingsDialogs } from './components/bookings-dialogs'
import { BookingsPrimaryButtons } from './components/bookings-primary-buttons'
// import { BookingsPrimaryButtons } from './components/bookings-primary-buttons'
import { DataTable } from './components/data-table'
import BookingsProvider from './context/bookings-context'

export default function Bookings() {
  return (
    <BookingsProvider>
      <Header fixed>
        <div className='ml-auto flex items-center space-x-4'>
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Bookings</h2>
            <p className='text-muted-foreground'>Here's a list of bookings!</p>
          </div>
          <BookingsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable />
        </div>
      </Main>

      <BookingsDialogs />
    </BookingsProvider>
  )
}
