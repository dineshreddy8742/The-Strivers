'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Application Settings</CardTitle>
          <CardDescription>Manage your application settings</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Settings page is under construction.</p>
        </CardContent>
      </Card>
    </div>
  )
}
