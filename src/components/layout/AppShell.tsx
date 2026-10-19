import { Outlet } from 'react-router-dom'
import BottomTabBar from './BottomTabBar'
import QuickAddSheet from './QuickAddSheet'

export default function AppShell() {
  return (
    <div className="mx-auto min-h-dvh max-w-xl pb-[calc(env(safe-area-inset-bottom,0px)+5.5rem)]">
      <Outlet />
      <QuickAddSheet />
      <BottomTabBar />
    </div>
  )
}
