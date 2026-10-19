import { doc, serverTimestamp, setDoc, type DocumentData } from 'firebase/firestore'
import { db } from '../firebase/client'
import { emptyProfile, type Profile } from '../types/models'

export const profileRef = (uid: string) => doc(db, 'users', uid, 'profile', 'main')

/** 把資料庫內容整理成 Profile，缺的欄位用預設值補上 */
export function parseProfile(data: DocumentData): Profile {
  return {
    treatmentType: typeof data.treatmentType === 'string' ? data.treatmentType : emptyProfile.treatmentType,
    startDate: typeof data.startDate === 'string' ? data.startDate : emptyProfile.startDate,
    expectedEndDate: typeof data.expectedEndDate === 'string' ? data.expectedEndDate : emptyProfile.expectedEndDate,
    clinicName: typeof data.clinicName === 'string' ? data.clinicName : emptyProfile.clinicName,
    doctorName: typeof data.doctorName === 'string' ? data.doctorName : emptyProfile.doctorName,
    totalPrice: typeof data.totalPrice === 'number' ? data.totalPrice : null,
    paymentMethod: typeof data.paymentMethod === 'string' ? data.paymentMethod : emptyProfile.paymentMethod,
  }
}

export async function saveProfile(uid: string, profile: Profile): Promise<void> {
  await setDoc(profileRef(uid), { ...profile, updatedAt: serverTimestamp() }, { merge: true })
}
