import { useAuth0 } from '@auth0/auth0-react'
import { Layout } from '@components'
import { FC } from 'react'
import { CreateWorkshopForm } from './form'

interface Props {}

export const CreateWorkshopPage: FC<Props> = () => {
  const { user, logout } = useAuth0()
  if (!user || user.email !== 'ibc.admin@ibc-sofia.org') {
    logout({ returnTo: 'https://ibc-sofia.org' })
    return <></>
  }
  return (
    <Layout title='Create Workshop'>
      <CreateWorkshopForm />
    </Layout>
  )
}
