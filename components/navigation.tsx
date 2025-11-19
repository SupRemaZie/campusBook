'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BookOpen, Calendar, Package, Users, UserCircle } from 'lucide-react'

const navItems = [
  {
    href: '/',
    label: 'Dashboard',
    icon: BookOpen
  },
  {
    href: '/rooms',
    label: 'Salles',
    icon: Calendar
  },
  {
    href: '/equipment',
    label: 'Équipements',
    icon: Package
  },
  {
    href: '/appointments',
    label: 'Rendez-vous',
    icon: Users
  },
  {
    href: '/profile',
    label: 'Mon Espace',
    icon: UserCircle
  }
]

export function Navigation() {
  const pathname = usePathname()
  
  return (
    <nav className="border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 font-semibold text-xl">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="text-balance">Campus Book</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-primary text-primary-foreground" 
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
