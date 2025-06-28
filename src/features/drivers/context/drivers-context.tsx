import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Driver } from '../data/schema'

type DriversDialogType = 'create' | 'update' | 'delete'

interface DriversContextType {
  open: DriversDialogType | null
  setOpen: (str: DriversDialogType | null) => void
  currentRow: Driver | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Driver | null>>
}

const DriversContext = React.createContext<DriversContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function DriversProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<DriversDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Driver | null>(null)

  return (
    <DriversContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </DriversContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDrivers = () => {
  const driversContext = React.useContext(DriversContext)

  if (!driversContext) {
    throw new Error('useDrivers has to be used within <DriversContext>')
  }

  return driversContext
}
