import { FC } from 'react'
import { Layout } from '@components'
import { UserDetailsForm } from './form'
import { User } from '@models'
import { useRouter } from 'next/router'

interface Props {
  user: User | null
}

export const UserDetailsPage: FC<Props> = ({ user }) => {
  const router = useRouter()
  if (user) router.push('/')
  return (
    <Layout title='User Details'>
      <UserDetailsForm />
    </Layout>
  )
}
