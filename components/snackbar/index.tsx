import { useState, createContext, FC, useContext } from 'react'
import { Snackbar } from '@mui/material'

interface Props {
  children?: React.ReactNode
}

interface HookPayload {
  setMessage: (m: string) => void
}

const SnackbarContext = createContext<HookPayload>({
  setMessage: () => {}
})

export const SnackbarContextProvider: FC<Props> = ({ children }) => {
  const [open, setOpen] = useState<boolean | undefined>(false)
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>('')

  const handleClose = () => setOpen(false)

  const setMessage = (msg: string) => {
    setSnackbarMessage(msg)
    setOpen(true)
  }

  return (
    <SnackbarContext.Provider value={{ setMessage }}>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
      />
      {children}
    </SnackbarContext.Provider>
  )
}

export const useSnackbar = () => useContext(SnackbarContext)
