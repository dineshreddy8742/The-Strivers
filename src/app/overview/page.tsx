'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

const pages = [
  {
    title: 'Dashboard',
    description: 'Your personalized overview of key metrics, recent assessments, and quick actions.',
    href: '/',
  },
  {
    title: 'Assessments',
    description: 'Detailed analysis results of your Life Cycle Assessments, including impact categories and circular flow visualization.',
    href: '/assessments',
  },
  {
    title: 'Reports',
    description: 'Generate comprehensive LCA reports with AI-powered insights and recommendations.',
    href: '/reports',
  },
  {
    title: 'Data',
    description: 'Manage and view your raw environmental data and inputs for LCA calculations.',
    href: '/data',
  },
  {
    title: 'How It Works',
    description: 'Understand the methodology and process behind the AI-driven LCA tool.',
    href: '/how-it-works',
  },
  {
    title: 'FAQ',
    description: 'Frequently asked questions about the platform and LCA concepts.',
    href: '/faq',
  },
  {
    title: 'Testimonials',
    description: 'Read what our users and experts say about The Strivers AI.',
    href: '/testimonials',
  },
  {
    title: 'Stakeholders',
    description: 'Information and resources for various stakeholders involved in sustainability initiatives.',
    href: '/stakeholders',
  },
  {
    title: 'Contact',
    description: 'Get in touch with our support team for feedback, questions, or assistance.',
    href: '/contact',
  },
  {
    title: 'The Strivers AI',
    description: 'Interact with our AI assistant for quick insights, data analysis, and image generation.',
    href: '/chatbot',
  },
  {
    title: 'Login',
    description: 'Access your account to manage your assessments and data.',
    href: '/login',
  },
  {
    title: 'Sign Up',
    description: 'Create a new account to start using The Strivers AI platform.',
    href: '/signup',
  },
  {
    title: 'Profile',
    description: 'View and manage your user profile and personal settings.',
    href: '/profile',
  },
  {
    title: 'Settings',
    description: 'Configure application settings and preferences.',
    href: '/settings',
  },
];

export default function OverviewPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Application Overview</CardTitle>
          <CardDescription className="text-center">
            Explore all the features and pages available in The Strivers AI platform.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {pages.map((page, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-lg font-semibold">{page.title}</AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">{page.description}</p>
                  <Link href={page.href} className="text-blue-600 hover:underline">
                    Go to {page.title}
                  </Link>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
