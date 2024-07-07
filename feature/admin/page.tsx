import { useAuth0 } from '@auth0/auth0-react'
import { Layout } from '@components'
import { Button } from '@mui/material'
import { STATIC_ROUTES } from '@util'
import Link from 'next/link'
import { FC } from 'react'
import { AdminTabs } from './tabs'

interface Props {}

export const AdminPage: FC<Props> = () => {
  const { user, logout } = useAuth0()
  if (!user || user.email !== 'ibc.admin@ibc-sofia.org') {
    logout({ returnTo: 'https://ibc-sofia.org' })
    return <></>
  }
  return (
    <Layout
      title='Admin'
      action={
        <Link
          href={STATIC_ROUTES.createWorkshop.href}
          as={STATIC_ROUTES.createWorkshop.as}
          passHref
        >
          <Button variant='contained'>Create Workshop</Button>
        </Link>
      }
    >
      <AdminTabs />
    </Layout>
  )
}
