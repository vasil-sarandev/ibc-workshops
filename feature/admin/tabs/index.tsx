import { Tab, Tabs } from '@mui/material'
import { Box } from '@mui/system'
import { FC, useState, SyntheticEvent } from 'react'
import { UsersTab } from './users'
import { WorkshopsTab } from './workshops'

interface Props {}

export const AdminTabs: FC<Props> = () => {
  const [tab, setTab] = useState('users')

  const handleChange = (event: SyntheticEvent, newValue: string) => {
    setTab(newValue)
  }

  return (
    <Box>
      <Tabs value={tab} onChange={handleChange} aria-label='basic tabs example'>
        <Tab label='Users' value={'users'} />
        <Tab label='Workshops' value={'workshops'} />
      </Tabs>
      <Box mt={3}>
        {tab === 'users' && <UsersTab />}
        {tab === 'workshops' && <WorkshopsTab />}
      </Box>
    </Box>
  )
}
