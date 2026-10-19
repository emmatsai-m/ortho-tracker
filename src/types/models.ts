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

/** 款項：users/{uid}/payments/{id} */
export type Payment = {
  id: string
  /** 療程款 或 額外牙科費用 */
  kind: string
  /** 新臺幣整數 */
  amount: number
  /** 付款日（待付時為預計日期），YYYY-MM-DD */
  date: string
  /** 已付 或 待付 */
  status: string
  /** 預計付款日（待付時使用），YYYY-MM-DD；沒有為空字串 */
  dueDate: string
  /** 現金、信用卡等；沒選為空字串 */
  method: string
  note: string
}

export type PaymentInput = Omit<Payment, 'id'>

/** 用品：users/{uid}/supplies/{id} */
export type Supply = {
  id: string
  /** 名稱；沒填時使用分類名稱 */
  name: string
  category: string
  brand: string
  spec: string
  quantity: number
  /** 單價（新臺幣整數） */
  unitPrice: number
  /** 總價 = 數量 × 單價 */
  totalPrice: number
  /** 購買日期，YYYY-MM-DD */
  purchaseDate: string
  store: string
  /** 未開封、使用中、已用完 */
  status: string
  /** 會回購、不回購；還沒決定為空字串 */
  repurchase: string
  note: string
}

export type SupplyInput = Omit<Supply, 'id'>

/** 療程日誌：users/{uid}/logs/{id} */
export type Log = {
  id: string
  /** 回診、身體感受、特殊事件 */
  type: string
  /** YYYY-MM-DD */
  date: string
  /** 施作項目（回診用） */
  items: string[]
  /** 疼痛程度 0～5（身體感受用）；沒有為 null */
  painLevel: number | null
  /** 症狀（身體感受用） */
  symptoms: string[]
  /** 事件標籤（特殊事件用） */
  eventTags: string[]
  /** 下次回診日期（回診用），YYYY-MM-DD；沒有為空字串 */
  nextVisitDate: string
  note: string
}

export type LogInput = Omit<Log, 'id'>
