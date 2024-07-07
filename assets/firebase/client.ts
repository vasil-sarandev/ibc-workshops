import { ref, child, get, set, onValue, push, runTransaction } from 'firebase/database'
import { AbstractStatus, Attendant, User, Workshop } from '@models'
import { database } from './firebase'
import { FormState as WorkshopFormState } from '@feature/create-workshop/form'
import { FormState } from '@feature/user-details/form'

const dbRef = ref(database)

export const getUserData = async (id: string): Promise<User | null> => {
  const snapshot = await get(child(dbRef, `users/${id}`))
  if (snapshot.exists()) return snapshot.val()
  else return null
}

export const setUserData = async (id: string, email: string, data: FormState): Promise<void> => {
  const user: User = {
    type: data.type,
    details: {
      name: data.name,
      age: data.age,
      phone: data.phone,
      country: data.country,
      university: data.university,
      program: data.program,
      academicYear: data.academicYear,
      email
    },
    paid: false,
    attending: false,
    status: 'DEFAULT'
  }
  return set(ref(database, 'users/' + id), user)
}

export const subscribeToWorkshopsEnabled = async (setWorkshopsEnabled: (a: boolean) => void) => {
  onValue(ref(database, '/workshopsEnabled'), (snapshot) => {
    if (snapshot.exists()) setWorkshopsEnabled(snapshot.val())
    else setWorkshopsEnabled(false)
  })
}

export const subscribeToWorkshops = async (setWorkshops: (w: Record<string, Workshop>) => void) => {
  onValue(ref(database, '/workshops'), (snapshot) => {
    if (snapshot.exists()) setWorkshops(snapshot.val())
    else setWorkshops({})
  })
}

export const subscribeToUsers = async (setUsers: (w: Record<string, User>) => void) => {
  onValue(ref(database, '/users'), (snapshot) => {
    if (snapshot.exists()) setUsers(snapshot.val())
    else setUsers({})
  })
}

export const markUserAsPaid = async (id: string): Promise<void> => {
  return set(ref(database, `users/${id}/paid`), true)
}

export const markUserAsNotPaid = async (id: string): Promise<void> => {
  return set(ref(database, `users/${id}/paid`), false)
}

export const markUserAsAttending = async (id: string): Promise<void> => {
  return set(ref(database, `users/${id}/attending`), true)
}

export const markUserAsNotAttending = async (id: string): Promise<void> => {
  return set(ref(database, `users/${id}/attending`), false)
}

export const acceptUserAbstract = async (id: string): Promise<void> => {
  const newStatus: AbstractStatus = 'ACCEPTED'
  return set(ref(database, `users/${id}/status`), newStatus)
}

export const declineUserAbstract = async (id: string): Promise<void> => {
  const newStatus: AbstractStatus = 'DEFAULT'
  return set(ref(database, `users/${id}/status`), newStatus)
}

export const createWorkshop = async (data: WorkshopFormState): Promise<void> => {
  // Get a key for the workshop.
  const id = push(child(ref(database), 'workshops')).key

  const workshop: Workshop = {
    ...data,
    capacity: +data.capacity,
    id: id as string,
    attending: 0,
    attendants: []
  }

  return set(ref(database, `workshops/${id}`), workshop)
}

export const addParticipantToWorkshop = async (
  attendant: Attendant,
  workshopId: string
): Promise<void> => {
  const workshopRef = ref(database, `workshops/${workshopId}`)

  runTransaction(workshopRef, (workshop: Workshop) => {
    if (workshop) {
      if (workshop.attending >= workshop.capacity) {
        throw new Error('Workshop is full!')
      }
      workshop.attending = workshop.attending + 1
      if (workshop.attendants) workshop.attendants = [...workshop.attendants, attendant]
      else workshop.attendants = [attendant]
    }
    return workshop
  })
}
