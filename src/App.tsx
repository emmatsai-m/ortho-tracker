import { HashRouter, Route, Routes } from 'react-router-dom'
import AppShell from './components/layout/AppShell'
import Expenses from './pages/Expenses'
import Home from './pages/Home'
import Logs from './pages/Logs'
import Settings from './pages/Settings'
import Supplies from './pages/Supplies'

// 使用 HashRouter：網址形如 /#/logs，GitHub Pages 重新整理才不會 404。
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppShell />}>
          <Route index element={<Home />} />
          <Route path="logs" element={<Logs />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="supplies" element={<Supplies />} />
          <Route path="settings" element={<Settings />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
