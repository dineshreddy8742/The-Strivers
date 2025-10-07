'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Upload, Download } from 'lucide-react'

export default function DataPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Data Management</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Import Data
            </CardTitle>
            <CardDescription>Import your LCA data from a file</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center space-y-4 p-8 border-2 border-dashed rounded-lg">
              <p className="text-slate-500">Drag and drop your file here</p>
              <p className="text-slate-500">or</p>
              <Button variant="outline">Select File</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Download className="w-5 h-5" />
              Export Data
            </CardTitle>
            <CardDescription>Export your LCA data to a file</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <p>Select the data you want to export and the format.</p>
              <Button className="w-full">Export Data</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
