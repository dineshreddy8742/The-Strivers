'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, Settings } from 'lucide-react'

export default function StakeholdersPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-slate-900">Stakeholder Views</h1>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Customized Reports for Decision-Makers
          </CardTitle>
          <CardDescription>Tailor your LCA insights for specific audiences</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-slate-600">
            This section is designed to provide customized views and reports for various stakeholders, such as regulators, government officials, investors, and internal decision-makers.
            The goal is to present LCA analysis and circularity insights in a format that is most relevant and impactful for their specific needs.
          </p>
          <p className="text-slate-600">
            Future enhancements will include:
          </p>
          <ul className="list-disc list-inside text-slate-600 space-y-1">
            <li>Pre-configured report templates for different stakeholder groups.</li>
            <li>Options to highlight specific metrics, impacts, or recommendations.</li>
            <li>Integration with policy frameworks and regulatory requirements.</li>
            <li>Interactive dashboards for exploring data relevant to specific roles.</li>
          </ul>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Settings className="w-4 h-4" />
            Customization options will be available in the settings.
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
