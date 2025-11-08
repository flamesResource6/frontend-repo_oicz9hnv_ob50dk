import { useMemo } from 'react'

export default function Navbar() {
  const logo = useMemo(() => ({ name: 'Flames', accent: 'Blue' }), [])
  return (
    <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/60 border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-500 to-indigo-600" />
          <span className="font-semibold text-gray-900">
            {logo.name}
            <span className="text-blue-600">{logo.accent}</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-600">
          <a href="#pricing" className="hover:text-gray-900">Pricing</a>
          <a href="#features" className="hover:text-gray-900">Features</a>
          <a href="#faq" className="hover:text-gray-900">FAQ</a>
        </nav>
        <div className="flex items-center gap-3">
          <button className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-900">Sign in</button>
          <button className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md">Get started</button>
        </div>
      </div>
    </header>
  )
}
