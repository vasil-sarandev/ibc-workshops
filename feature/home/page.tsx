import { FC } from 'react'
import { User } from '@models'
import { useRouter } from 'next/router'
import { redirectUser } from './util'
import { PageLoader } from '@components'
import { useAuth0 } from '@auth0/auth0-react'

interface Props {
  user: User
}

export const Homepage: FC<Props> = ({ user }) => {
  const { user: authUser } = useAuth0()
  const router = useRouter()
  if (authUser) redirectUser(user, authUser, router)
  return <PageLoader />
}
