import type { NextPage } from 'next'
import { withAuthentication, withUser } from '@feature/auth'
import { User } from '@models'
import { AccountPage } from '@feature/account'

interface Props {
  user: User | null
}

const Account: NextPage<Props> = ({ user }) => {
  return <AccountPage user={user} />
}

export default withAuthentication(withUser(Account))
