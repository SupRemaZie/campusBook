'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { BookOpen, Calendar, Package, Users, UserCircle } from 'lucide-react'

const navItems = [
  { href: '/', label: 'Dashboard', icon: BookOpen },
  { href: '/rooms', label: 'Salles', icon: Calendar },
  { href: '/equipment', label: 'Équipements', icon: Package },
  { href: '/appointments', label: 'RDV', icon: Users },
  { href: '/profile', label: 'Profil', icon: UserCircle }
]

export function MobileNavigation() {
  const pathname = usePathname()
  
  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center gap-1 px-3 py-3 text-xs font-medium transition-colors flex-1",
                isActive 
                  ? "text-primary" 
                  : "text-muted-foreground"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
