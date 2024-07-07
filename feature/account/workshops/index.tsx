import { User } from '@models'
import { FC } from 'react'
import { WorkshopsList } from './list'
import { useSubscribeToWorkshopsEnabled } from './util'
import s from './workshops.module.css'

interface Props {
  user: User
}

export const AccountWorkshops: FC<Props> = ({ user }) => {
  const { enabled, loading } = useSubscribeToWorkshopsEnabled()
  if (loading) return <></>
  if (enabled === false) return <>Signing up for workshops is temporarily disabled.</>

  return (
    <div className={s.container}>
      <WorkshopsList user={user} />
    </div>
  )
}
