import type { NextPage } from 'next'
import { withAuthentication, withUser } from '@feature/auth'
import { Homepage } from '@feature/home'
import { User } from '@models'

interface Props {
  user: User
}
const Home: NextPage<Props> = ({ user }) => {
  return <Homepage user={user} />
}

export default withAuthentication(withUser(Home))
