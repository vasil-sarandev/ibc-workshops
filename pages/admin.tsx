import type { NextPage } from 'next'
import { AdminPage } from '@feature/admin'
import { withAuthentication } from '@feature/auth'

interface Props {}

const Admin: NextPage<Props> = () => {
  return <AdminPage />
}

export default withAuthentication(Admin)
