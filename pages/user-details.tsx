import type { NextPage } from 'next'
import { UserDetailsPage } from '@feature/user-details'
import { withAuthentication, withUser } from '@feature/auth'
import { User } from '@models'

interface Props {
  user: User | null
}

const UserDetails: NextPage<Props> = ({ user }) => {
  return <UserDetailsPage user={user} />
}

export default withAuthentication(withUser(UserDetails))
