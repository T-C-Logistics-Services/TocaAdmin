import {
  IconBrowserCheck,
  IconLayoutDashboard,
  IconSettings,
  IconUserCog,
  IconUsers,
} from '@tabler/icons-react'
import { Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [],
  navGroups: [
    {
      title: 'Home',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Monitoring',
          url: '/monitoring',
          icon: IconBrowserCheck,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Booking Management',
          url: '/bookings',
          icon: IconBrowserCheck,
        },
        // {
        //   title: 'Hub Management',
        //   url: '/hubs',
        //   icon: IconPackages,
        // },
        {
          title: 'Driver Management',
          url: '/drivers',
          icon: IconUsers,
        },
        {
          title: 'Customer Management',
          url: '/customers',
          icon: IconUserCog,
        },
        {
          title: 'User Management',
          url: '/users',
          icon: IconSettings,
        },
      ],
    },
    {
      title: 'Others',
      items: [
        {
          title: 'Delivery Statistics',
          url: '/delivery-statistics',
          icon: GalleryVerticalEnd,
        },
        {
          title: 'Finance',
          url: '/finance',
          icon: Command,
        },
      ],
    },
  ],
}
