import { FC, ReactNode } from 'react'
import Div100vh from 'react-div-100vh'
import { motion } from 'framer-motion'
import { Header } from './header'
import { Footer } from './footer'
import s from './layout.module.css'

interface Props {
  children?: ReactNode
  title?: string
  action?: ReactNode
}

export const Layout: FC<Props> = ({ children, title, action }) => (
  <Div100vh style={{ minHeight: '100rvh', display: 'flex', flexDirection: 'column' }}>
    <div className={s.container}>
      <div className={s.header}>
        <Header />
      </div>
      <motion.div
        className={s.motionDiv}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <main className={s.main}>
          <div className={s.contentHeader}>
            <div className={s.pageTitle}>{title}</div>
            <div className={s.actions}>{action}</div>
          </div>
          {children}
        </main>
      </motion.div>
      <div className={s.footer}>
        <Footer />
      </div>
    </div>
  </Div100vh>
)
