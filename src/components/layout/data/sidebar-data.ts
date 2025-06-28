import {
  IconBrowserCheck,
  IconLayoutDashboard,
  IconPackages,
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
          url: '/',
          icon: IconBrowserCheck,
        },
      ],
    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Hub Management',
          url: '/hub-management',
          icon: IconPackages,
        },
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
