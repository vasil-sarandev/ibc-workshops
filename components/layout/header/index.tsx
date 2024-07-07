/* eslint-disable @next/next/no-img-element */
import { FC } from 'react'
import s from './header.module.css'
import LogoutIcon from '@mui/icons-material/Logout'
import { useAuth0 } from '@auth0/auth0-react'

export const Header: FC = () => {
  const { logout } = useAuth0()
  const handleLogout = () => {
    // logout({ returnTo: 'https://ibc-sofia.org' })
    // logout({ returnTo: 'https://ibc-workshops.vercel.app' })
    logout({ returnTo: 'https://workshops.ibc-sofia.org' })
  }
  return (
    <div className={s.container}>
      <div className={s.inner}>
        <div className={s.logo}>
          <img src='https://i.imgur.com/A5GZuJL.png' alt='IBC-Sofia' />
        </div>
        <div className={s.actions}>
          <div className={s.logout} onClick={handleLogout}>
            <LogoutIcon />
          </div>
        </div>
      </div>
    </div>
  )
}
