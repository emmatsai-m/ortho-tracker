// 資料型別集中在這裡。

/** 療程基本資料：users/{uid}/profile/main */
export type Profile = {
  /** 矯正類型，來自 TREATMENT_TYPES；未選為空字串 */
  treatmentType: string
  /** 開始日，格式 YYYY-MM-DD；未填為空字串 */
  startDate: string
  /** 預計結束日，格式 YYYY-MM-DD；未填為空字串 */
  expectedEndDate: string
  clinicName: string
  doctorName: string
  /** 療程總價（新臺幣整數）；未填為 null */
  totalPrice: number | null
  /** 付款方式，來自 PAYMENT_METHODS；未選為空字串 */
  paymentMethod: string
}

export const emptyProfile: Profile = {
  treatmentType: '',
  startDate: '',
  expectedEndDate: '',
  clinicName: '',
  doctorName: '',
  totalPrice: null,
  paymentMethod: '',
}
