import { useState, useEffect, useCallback } from 'react'
import { getUserData } from 'assets/firebase'
import { User } from '@models'

export const useFetchUser = (id: string) => {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState<User | null>(null)

  const fetchUser = useCallback(async () => {
    setLoading(true)
    const resp = await getUserData(id)
    setUser(resp)
  }, [id])

  useEffect(() => {
    fetchUser()
  }, [fetchUser])

  return { loading, user }
}
