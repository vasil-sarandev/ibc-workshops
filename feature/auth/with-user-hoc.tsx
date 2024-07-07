import { useAuth0 } from '@auth0/auth0-react'
import { ComponentType, FC, useEffect, useState } from 'react'
import { PageLoader } from '@components'
import { getUserData } from 'assets/firebase'
import { User } from '@models'

export const withUser =
  <P extends object>(Component: React.ComponentType<P>): FC<P> =>
  // eslint-disable-next-line react/display-name
  (props) => {
    const { user } = useAuth0()
    const [loading, setLoading] = useState(true)
    const [dbUser, setDbUser] = useState<User | null>(null)
    const [error, setError] = useState(false)

    useEffect(() => {
      const fetchUser = async () => {
        try {
          if (user) {
            const dbUser = await getUserData(user.sub as string)
            setDbUser(dbUser)
            setLoading(false)
          }
        } catch (e) {
          setError(true)
          throw new Error('loading user failed. fetchUser')
        }
      }
      fetchUser()
    }, [user])

    if (error) return <>Възникна грешка. моля опитайте по-късно.</>
    if (loading) return <PageLoader />

    return <Component {...props} user={dbUser} />
  }
