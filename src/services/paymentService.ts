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
import type { Payment, PaymentInput } from '../types/models'

export const paymentsCol = (uid: string) => collection(db, 'users', uid, 'payments')
const paymentDoc = (uid: string, id: string) => doc(db, 'users', uid, 'payments', id)

const str = (v: unknown) => (typeof v === 'string' ? v : '')

export function parsePayment(id: string, data: DocumentData): Payment {
  return {
    id,
    kind: str(data.kind) || '療程款',
    amount: typeof data.amount === 'number' ? data.amount : 0,
    date: str(data.date),
    status: str(data.status) || '已付',
    dueDate: str(data.dueDate),
    method: str(data.method),
    note: str(data.note),
  }
}

export async function createPayment(uid: string, input: PaymentInput): Promise<void> {
  await addDoc(paymentsCol(uid), { ...input, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updatePayment(uid: string, id: string, input: PaymentInput): Promise<void> {
  await updateDoc(paymentDoc(uid, id), { ...input, updatedAt: serverTimestamp() })
}

export async function deletePayment(uid: string, id: string): Promise<void> {
  await deleteDoc(paymentDoc(uid, id))
}
