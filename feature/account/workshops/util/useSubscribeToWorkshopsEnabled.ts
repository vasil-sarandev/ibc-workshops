import { subscribeToWorkshopsEnabled } from 'assets/firebase'
import { useEffect, useState } from 'react'

interface HookPayload {
  loading: boolean
  enabled: boolean | null
}
export const useSubscribeToWorkshopsEnabled = (): HookPayload => {
  const [enabled, setEnabled] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(true)

  const setResult = (v: boolean) => {
    setLoading(false)
    setEnabled(v)
  }

  useEffect(() => {
    subscribeToWorkshopsEnabled(setResult)
  }, [])

  return {
    loading,
    enabled
  }
}
