'use client'

import { useSession, signOut } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

export default function ProfilePage() {
  const { data: session } = useSession()

  if (!session) {
    return null
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Your personal information</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={session.user?.image || undefined} />
              <AvatarFallback>{session.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{session.user?.name}</p>
              <p className="text-sm text-slate-500">{session.user?.email}</p>
            </div>
          </div>
          <Button variant="destructive" onClick={() => signOut()}>Logout</Button>
        </CardContent>
      </Card>
    </div>
  )
}
