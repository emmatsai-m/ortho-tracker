import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../auth/useAuth'

// 未登入就導向登入頁；確認登入狀態期間先顯示載入中
export default function AuthGuard() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-dvh items-center justify-center text-steel" role="status">
        載入中…
      </div>
    )
  }
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
