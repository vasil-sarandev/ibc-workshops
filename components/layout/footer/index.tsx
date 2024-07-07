import { FC } from 'react'
import s from './footer.module.scss'

export const Footer: FC = () => {
  const year = new Date().getFullYear()
  return <div className={s.container}>IBCS {year}. All rights reserved.</div>
}
