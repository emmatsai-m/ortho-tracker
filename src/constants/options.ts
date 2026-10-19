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
