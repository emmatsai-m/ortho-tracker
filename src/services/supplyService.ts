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
import type { Supply, SupplyInput } from '../types/models'

export const suppliesCol = (uid: string) => collection(db, 'users', uid, 'supplies')
const supplyDoc = (uid: string, id: string) => doc(db, 'users', uid, 'supplies', id)

const str = (v: unknown) => (typeof v === 'string' ? v : '')
const num = (v: unknown, fallback = 0) => (typeof v === 'number' ? v : fallback)

export function parseSupply(id: string, data: DocumentData): Supply {
  return {
    id,
    name: str(data.name),
    category: str(data.category),
    brand: str(data.brand),
    spec: str(data.spec),
    quantity: num(data.quantity, 1),
    unitPrice: num(data.unitPrice),
    totalPrice: num(data.totalPrice),
    purchaseDate: str(data.purchaseDate),
    store: str(data.store),
    status: str(data.status) || '未開封',
    repurchase: str(data.repurchase),
    note: str(data.note),
  }
}

export async function createSupply(uid: string, input: SupplyInput): Promise<void> {
  await addDoc(suppliesCol(uid), { ...input, createdAt: serverTimestamp(), updatedAt: serverTimestamp() })
}

export async function updateSupply(uid: string, id: string, input: SupplyInput): Promise<void> {
  await updateDoc(supplyDoc(uid, id), { ...input, updatedAt: serverTimestamp() })
}

/** 只更新使用狀態（列表上一鍵切換用） */
export async function updateSupplyStatus(uid: string, id: string, status: string): Promise<void> {
  await updateDoc(supplyDoc(uid, id), { status, updatedAt: serverTimestamp() })
}

export async function deleteSupply(uid: string, id: string): Promise<void> {
  await deleteDoc(supplyDoc(uid, id))
}
