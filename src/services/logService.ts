import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
  type DocumentData,
} from 'firebase/firestore'
import { db } from '../firebase/client'
import type { Log, LogInput } from '../types/models'

export const logsCol = (uid: string) => collection(db, 'users', uid, 'logs')
const logDoc = (uid: string, id: string) => doc(db, 'users', uid, 'logs', id)

const str = (v: unknown) => (typeof v === 'string' ? v : '')
const strArray = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : [])

export function parseLog(id: string, data: DocumentData): Log {
  return {
    id,
    type: str(data.type) || '回診',
    date: str(data.date),
    items: strArray(data.items),
    painLevel: typeof data.painLevel === 'number' ? data.painLevel : null,
    symptoms: strArray(data.symptoms),
    eventTags: strArray(data.eventTags),
    nextVisitDate: str(data.nextVisitDate),
    note: str(data.note),
  }
}

export async function createLog(uid: string, input: LogInput): Promise<void> {
  await addDoc(logsCol(uid), { ...input, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateLog(uid: string, id: string, input: LogInput): Promise<void> {
  await updateDoc(logDoc(uid, id), { ...input, updatedAt: serverTimestamp() })
}

export async function deleteLog(uid: string, id: string): Promise<void> {
  await deleteDoc(logDoc(uid, id))
}
