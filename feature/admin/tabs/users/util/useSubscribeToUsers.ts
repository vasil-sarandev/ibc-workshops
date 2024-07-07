import { User } from '@models'
import { subscribeToUsers } from 'assets/firebase'
import { useEffect, useState } from 'react'

export interface UserObjectAdminPanel extends User {
  id: string
}

interface HookPayload {
  loading: boolean
  users: UserObjectAdminPanel[]
}

export const useSubscribeToUsers = (): HookPayload => {
  const [users, setUsers] = useState<UserObjectAdminPanel[]>([])
  const [loading, setLoading] = useState(true)

  const setResult = (w: Record<string, User>) => {
    let usersData: UserObjectAdminPanel[] = []
    Object.keys(w).forEach((key) => {
      usersData.push({ ...w[key], id: key })
    })
    setLoading(false)
    setUsers(usersData)
  }

  useEffect(() => {
    subscribeToUsers(setResult)
  }, [])

  return {
    users,
    loading
  }
}
