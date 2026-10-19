import { HashRouter, Route, Routes } from 'react-router-dom'
import AuthProvider from './auth/AuthProvider'
import AppShell from './components/layout/AppShell'
import AuthGuard from './components/layout/AuthGuard'
import ExpenseEdit from './pages/ExpenseEdit'
import Expenses from './pages/Expenses'
import Home from './pages/Home'
import Login from './pages/Login'
import LogEdit from './pages/LogEdit'
import Logs from './pages/Logs'
import Settings from './pages/Settings'
import Supplies from './pages/Supplies'
import SupplyEdit from './pages/SupplyEdit'

// 使用 HashRouter：網址形如 /#/logs，GitHub Pages 重新整理才不會 404。
export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route element={<AuthGuard />}>
            <Route element={<AppShell />}>
              <Route index element={<Home />} />
              <Route path="logs" element={<Logs />} />
              <Route path="logs/new" element={<LogEdit />} />
              <Route path="logs/:id" element={<LogEdit />} />
              <Route path="expenses" element={<Expenses />} />
              <Route path="expenses/new" element={<ExpenseEdit />} />
              <Route path="expenses/:id" element={<ExpenseEdit />} />
              <Route path="supplies" element={<Supplies />} />
              <Route path="supplies/new" element={<SupplyEdit />} />
              <Route path="supplies/:id" element={<SupplyEdit />} />
              <Route path="settings" element={<Settings />} />
              <Route path="*" element={<Home />} />
            </Route>
          </Route>
        </Routes>
      </HashRouter>
    </AuthProvider>
  )
}
