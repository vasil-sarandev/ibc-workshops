import { useAuth0 } from '@auth0/auth0-react'
import { useRouter } from 'next/router'
import { ComponentType, FC, useEffect } from 'react'
import { PageLoader } from '@components'
import { STATIC_ROUTES } from '@util'

interface Props {}

export const withAuthentication =
  <P extends object>(Component: React.ComponentType<P>): FC<P> =>
  // eslint-disable-next-line react/display-name
  (props) => {
    const router = useRouter()
    const { user, isAuthenticated, isLoading, loginWithRedirect } = useAuth0()

    useEffect(() => {
      if (isLoading === false && isAuthenticated === false) {
        loginWithRedirect()
      }
    }, [isAuthenticated, isLoading, loginWithRedirect, user])

    if (isLoading) return <PageLoader />
    if (!isAuthenticated && !user) {
      router.push(STATIC_ROUTES.homepage.as)
    }

    if (isAuthenticated && !!user) return <Component {...props} />

    return <PageLoader />
  }
