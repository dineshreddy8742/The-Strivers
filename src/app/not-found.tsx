'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-green-600">404</h1>
        <p className="text-2xl md:text-3xl font-light text-slate-800 mt-4">
          Oops! The page you're looking for doesn't exist.
        </p>
        <p className="text-slate-600 mt-2 mb-8">
          It might have been moved or deleted.
        </p>
        <Link href="/">
          <Button className="glow-button">
            Go to Dashboard
          </Button>
        </Link>
      </div>
    </div>
  )
}
