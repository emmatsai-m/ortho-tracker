/** 金額一律使用新臺幣整數 */
export function formatTWD(amount: number): string {
  return `NT$ ${amount.toLocaleString('zh-TW')}`
}
