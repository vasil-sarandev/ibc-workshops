import { Workshop } from '@models'
import { subscribeToWorkshops } from 'assets/firebase'
import { useCallback, useEffect, useState } from 'react'

interface HookPayload {
  loading: boolean
  workshops: Workshop[]
}

export const useSubscribeToWorkshops = (): HookPayload => {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)

  const setResult = useCallback((w: Record<string, Workshop>) => {
    let workshops: Workshop[] = []
    Object.keys(w).forEach((key) => {
      workshops.push({ ...w[key], id: key })
    })
    setLoading(false)
    setWorkshops(workshops)
  }, [])

  useEffect(() => {
    subscribeToWorkshops(setResult)
  }, [setResult])

  return {
    workshops,
    loading
  }
}
