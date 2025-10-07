'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  FileText,
  BarChart3,
  FileBarChart,
  LogIn,
  LogOut,
  UserPlus,
  User,
  Settings,
  Database,
  Mail,
  HelpCircle,
  MessageSquare,
  Star,
  Users,
  ClipboardList,
  List
} from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

const categorizedNavItems = [
  {
    category: 'Core Features',
    items: [
      { href: '/', label: 'Dashboard', icon: LayoutDashboard },
      { href: '/overview', label: 'Overview', icon: List },
      { href: '/assessments', label: 'Assessments', icon: FileText },
      { href: '/reports', label: 'Reports', icon: FileBarChart },
      { href: '/chatbot', label: 'The Strivers AI', icon: MessageSquare },
      { href: '/data', label: 'Data', icon: Database },
    ],
  },
  {
    category: 'Information & Support',
    items: [
      { href: '/how-it-works', label: 'How It Works', icon: HelpCircle },
      { href: '/faq', label: 'FAQ', icon: MessageSquare },
      { href: '/testimonials', label: 'Testimonials', icon: Star },
      { href: '/stakeholders', label: 'Stakeholders', icon: Users },
      { href: '/contact', label: 'Contact', icon: Mail },
    ],
  },
];

export function Sidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="hidden md:flex flex-col w-64 bg-white border-r">
      <div className="flex items-center justify-center h-24 border-b px-4">
        <Link href="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500">
          The Strivers
        </Link>
      </div>
      <nav className="flex-grow p-4 space-y-2">
        {categorizedNavItems.map((categoryItem, categoryIndex) => (
          <Accordion type="single" collapsible className="w-full" key={categoryIndex}>
            <AccordionItem value={`item-${categoryIndex}`} className="border-b-0">
              <AccordionTrigger className="py-2 text-sm font-semibold text-slate-700 hover:no-underline">
                {categoryItem.category}
              </AccordionTrigger>
              <AccordionContent className="pb-0">
                <div className="space-y-1">
                  {categoryItem.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all',
                        pathname === item.href
                          ? 'bg-green-100 text-green-700'
                          : 'text-slate-600 hover:bg-slate-100 hover:text-green-600 glow-text'
                      )}
                      aria-label={item.label}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Link>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </nav>
      <div className="p-4 border-t">
        {session ? (
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/profile">
                <User className="w-5 h-5 mr-3" />
                Profile
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/settings">
                <Settings className="w-5 h-5 mr-3" />
                Settings
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" onClick={() => signOut()}>
              <LogOut className="w-5 h-5 mr-3" />
              Logout
            </Button>
          </div>
        ) : (
          <div className="space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/login">
                <LogIn className="w-5 h-5 mr-3" />
                Login
              </Link>
            </Button>
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/signup">
                <UserPlus className="w-5 h-5 mr-3" />
                Sign Up
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}