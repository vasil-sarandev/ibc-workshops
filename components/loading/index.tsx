import { FC } from 'react'
import { CircularProgress } from '@mui/material'
import Div100vh from 'react-div-100vh'
import styles from './loading.module.scss'

export const PageLoader: FC = () => (
  <Div100vh style={{ minHeight: '100rvh', display: 'flex', flexDirection: 'column' }}>
    <div className={styles['page-loader']}>
      <CircularProgress />
    </div>
  </Div100vh>
)
