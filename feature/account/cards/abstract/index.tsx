import { AbstractStatus } from '@models'
import { Card } from '@mui/material'
import { FC } from 'react'
import s from '../styles.module.css'
import cn from 'classnames'

const cx = cn.bind(s)

interface Props {
  status: AbstractStatus
}

const getAbstractCardMessage = (status: AbstractStatus) => {
  switch (status) {
    case 'ACCEPTED':
      return 'Your abstract has been accepted. Thank you for your submission!'
    case 'DEFAULT':
      return 'Please submit your abstract to ibcs.abstracts@gmail.com'
    case 'REJECTED':
      return 'Your abstract has been rejected. Please contact a member of the Organizing Committee.'
    case 'SUBMITTED':
      return "Your abstract is being reviewed! We'll get back to you if there's any issues."
  }
}
export const AbstractCard: FC<Props> = ({ status }) => {
  const msg = getAbstractCardMessage(status)

  const cardClass = cx({
    [s.danger]: status === 'DEFAULT' || status === 'REJECTED'
  })
  return (
    <div className={s.container}>
      <Card
        className={cardClass}
        style={{
          flex: 1,
          height: '100%',
          padding: '10px 10px 20px 10px',
          background: 'var(--success)',
          color: '#fff'
        }}
      >
        <div className={s.title}>Abstract</div>
        <div className={s.info}>{msg}</div>
      </Card>
    </div>
  )
}
