'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { usePathname } from 'next/navigation'
import { Sidebar } from '@/components/ui/sidebar'
import { MobileSidebar } from '@/components/ui/mobile-sidebar'
import { Toaster } from '@/components/ui/toaster'

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const pathname = usePathname()
  const [countdown, setCountdown] = useState(20)

  useEffect(() => {
    if (status === 'loading') {
      const timer = setInterval(() => {
        setCountdown((prev) => (prev > 0 ? prev - 1 : 0))
      }, 1000)
      return () => clearInterval(timer)
    }
  }, [status])

  const showSidebar = session && (pathname !== '/login' && pathname !== '/signup')

  if (status === 'loading') {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen text-2xl font-bold text-gray-700">
        Loading... {countdown > 0 ? `(${countdown}s)` : ''}
      </div>
    )
  }

  return (
    <>
      {showSidebar && <Sidebar />}
      <div className="flex-1">
        {showSidebar && <MobileSidebar />}
        {children}
        <Toaster />
      </div>
    </>
  )
}
