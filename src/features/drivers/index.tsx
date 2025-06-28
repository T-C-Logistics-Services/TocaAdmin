import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { DataTable } from './components/data-table'
import { DriversDialogs } from './components/drivers-dialogs'
import { DriversPrimaryButtons } from './components/drivers-primary-buttons'
import DriversProvider from './context/drivers-context'

export default function Drivers() {
  return (
    <DriversProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex flex-wrap items-center justify-between space-y-2 gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Drivers</h2>
            <p className='text-muted-foreground'>Here's a list of drivers!</p>
          </div>
          <DriversPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-y-0 lg:space-x-12'>
          <DataTable />
        </div>
      </Main>

      <DriversDialogs />
    </DriversProvider>
  )
}
