import { Layout } from '@components'
import { User } from '@models'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { PaymentCard, AbstractCard } from './cards'
import s from './account.module.css'
import { AccountWorkshops } from './workshops'

interface Props {
  user: User | null
}
export const AccountPage: FC<Props> = ({ user }) => {
  const router = useRouter()
  if (!user) {
    router.push('/')
    return <></>
  }

  return (
    <Layout title='Account'>
      <div className={s.cards}>
        <PaymentCard paid={user.paid} />
        {user.type === 'ACTIVE' && <AbstractCard status={user.status} />}
      </div>
      <div className={s.workshops}>
        {user.paid ? (
          <AccountWorkshops user={user} />
        ) : (
          <>
            You&apos;ll be able to see workshop information once you have paid your participation
            fee.
          </>
        )}
      </div>
    </Layout>
  )
}
