import { FC, ReactElement } from 'react'
import { Auth0Provider as Auth0ProviderContext } from '@auth0/auth0-react'

interface Props {
  children: ReactElement | ReactElement[]
}

const auth0_domain = process.env.auth0_domain
const auth0_clientId = process.env.auth0_clientId
const auth0_redirectUri = process.env.auth0_redirectUri
const auth0_scope = process.env.auth0_scope

export const Auth0Provider: FC<Props> = ({ children }) => {
  const redirectUri = typeof window === 'undefined' ? auth0_redirectUri : window.location.origin
  return (
    <Auth0ProviderContext
      domain={auth0_domain as string}
      clientId={auth0_clientId as string}
      redirectUri={redirectUri}
      scope={auth0_scope}
      cacheLocation='localstorage'
      useRefreshTokens
    >
      {children}
    </Auth0ProviderContext>
  )
}
