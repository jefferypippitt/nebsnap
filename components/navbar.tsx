'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-black">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="flex h-16 items-center justify-between">
          <Link 
            href="/" 
            className="text-xl font-light tracking-tight"
          >
            Nebscape
          </Link>
          
          <div className="flex gap-8">
            <Link 
              href="/"
              className={`text-sm font-medium transition-colors ${
                pathname === '/' 
                  ? 'text-black dark:text-white' 
                  : 'text-gray-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Today
            </Link>
            <Link 
              href="/archive"
              className={`text-sm font-medium transition-colors ${
                pathname === '/archive' 
                  ? 'text-black dark:text-white' 
                  : 'text-gray-500 hover:text-black dark:hover:text-white'
              }`}
            >
              Archive
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 