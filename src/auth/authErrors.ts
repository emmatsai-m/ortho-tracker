// 把 Firebase 的錯誤代碼翻成看得懂的中文
export function authErrorMessage(error: unknown): string {
  const code = typeof error === 'object' && error !== null && 'code' in error ? String((error as { code: unknown }).code) : ''
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
      return 'Email 或密碼不正確，請再確認一次。'
    case 'auth/invalid-email':
      return 'Email 格式不正確。'
    case 'auth/user-disabled':
      return '這個帳號已被停用。'
    case 'auth/too-many-requests':
      return '嘗試次數過多，請稍後幾分鐘再試。'
    case 'auth/network-request-failed':
      return '網路連線失敗，請檢查網路後再試。'
    case 'auth/invalid-api-key':
    case 'auth/configuration-not-found':
      return '網站的 Firebase 設定有誤，請檢查設定值。'
    default:
      return '登入失敗，請稍後再試。'
  }
}
