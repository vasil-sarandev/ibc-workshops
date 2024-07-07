import type { NextPage } from 'next'
import { withAuthentication } from '@feature/auth'
import { CreateWorkshopPage } from '@feature/create-workshop'

interface Props {}

const CreateWorkshop: NextPage<Props> = () => {
  return <CreateWorkshopPage />
}

export default withAuthentication(CreateWorkshop)
