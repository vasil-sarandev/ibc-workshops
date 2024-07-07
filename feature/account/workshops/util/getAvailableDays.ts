import { Workshop, WorkshopDay } from '@models'

export type AvailableDays = Record<WorkshopDay, boolean>

export const getAvailableDays = (userWorkshops: Workshop[]): AvailableDays => {
  let fridayEnabled = true
  let saturdayEnabled = true
  let sundayEnabled = true

  for (let i = 0; i < userWorkshops.length; i++) {
    switch (userWorkshops[i].day) {
      case 'FRIDAY':
        fridayEnabled = false
        break
      case 'SATURDAY':
        saturdayEnabled = false
        break
      case 'SUNDAY':
        sundayEnabled = false
        break
    }
  }

  const available = {
    FRIDAY: fridayEnabled,
    SATURDAY: saturdayEnabled,
    SUNDAY: sundayEnabled
  }

  return available
}
