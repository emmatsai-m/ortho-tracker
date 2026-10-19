// 所有按鈕與選單的選項都集中在這裡，要增減項目只改這個檔案。
// 第一版先放入範例，後續階段會依功能補齊。

export const VISIT_ITEMS = [
  '換線',
  '換橡皮圈',
  '調整',
  '拆裝',
  '拍片',
  '洗牙',
  '黏回脫落托槽',
] as const

export const SYMPTOMS = ['痠痛', '牙齦腫', '口破', '鋼線戳嘴', '牙齒鬆動感', '口臭'] as const

export const SUPPLY_CATEGORIES = ['牙間刷', '牙線', '沖牙機', '牙刷', '漱口水', '護蠟', '收納盒', '其他'] as const

export const TREATMENT_TYPES = ['固定式（金屬）', '固定式（陶瓷）', '固定式（自鎖）', '隱形牙套', '其他'] as const

export const PAYMENT_METHODS = ['一次付清', '分期', '每次回診付'] as const

export const PAYMENT_KINDS = ['療程款', '額外牙科費用'] as const

export const PAYMENT_STATUSES = ['已付', '待付'] as const

/** 這筆款項是怎麼付的（和療程「付款方式」不同） */
export const EXPENSE_METHODS = ['現金', '信用卡', '轉帳', '行動支付', '其他'] as const

/** 金額快捷鈕 */
export const QUICK_AMOUNTS = [500, 1000, 2000, 5000, 10000, 20000] as const

export const SUPPLY_STATUSES = ['未開封', '使用中', '已用完'] as const

export const REPURCHASE_OPTIONS = ['會回購', '不回購'] as const

export const LOG_TYPES = ['回診', '身體感受', '特殊事件'] as const

export const EVENT_TAGS = ['托槽脫落', '鋼線戳嘴', '牙套遺失', '牙套破損', '緊急就診', '換新牙套', '其他'] as const

/** 疼痛程度 0～5 的簡短說明 */
export const PAIN_LABELS = ['無痛', '輕微', '有感', '明顯', '很痛', '難忍'] as const
