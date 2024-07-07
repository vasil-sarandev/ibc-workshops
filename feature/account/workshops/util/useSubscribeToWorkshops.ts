import { User, Workshop } from '@models'
import { subscribeToWorkshops } from 'assets/firebase'
import { useCallback, useEffect, useState } from 'react'

interface HookPayload {
  loading: boolean
  workshops: Workshop[]
}

export const useSubscribeToWorkshops = (user: User): HookPayload => {
  const [workshops, setWorkshops] = useState<Workshop[]>([])
  const [loading, setLoading] = useState(true)

  const setResult = useCallback(
    (w: Record<string, Workshop>) => {
      let workshops: Workshop[] = []
      Object.keys(w).forEach((key) => {
        workshops.push({ ...w[key], id: key })
      })
      //filter only workshops that users should see
      const filtered = workshops.filter((x) => {
        if (x.accountTypes.includes(user.type) && x.accountPrograms.includes(user.details.program))
          return true
        return false
      })
      setLoading(false)
      setWorkshops(filtered)
    },
    [user.details.program, user.type]
  )

  useEffect(() => {
    subscribeToWorkshops(setResult)
  }, [setResult])

  return {
    workshops,
    loading
  }
}
