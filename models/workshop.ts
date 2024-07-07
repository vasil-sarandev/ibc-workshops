import { AccountProgram, AccountType } from './user'

export type WorkshopDay = 'FRIDAY' | 'SATURDAY' | 'SUNDAY'

export interface Attendant {
  id: string
  email: string
  name: string
}

export interface CreateWorkshopObject {
  attending: number
  capacity: number
  attendants: Attendant[]
  day: WorkshopDay
  description: string
  name: string
  accountPrograms: AccountProgram[]
  accountTypes: AccountType[]
}
export interface Workshop extends CreateWorkshopObject {
  id: string
}
