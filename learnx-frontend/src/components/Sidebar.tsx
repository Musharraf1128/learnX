import React from 'react'
import { BookOpen, Plus, LogOut, Library, Settings2 } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Props = {
  open: boolean
  setOpen: (v: boolean) => void
}

const Sidebar: React.FC<Props> = ({ open, setOpen }) => {
  const { logout } = useAuth()
  const location = useLocation()

  return (
    <aside
      className={`h-screen bg-neutral-950/95 border-r border-neutral-800/80 backdrop-blur sticky top-0
                  flex flex-col transition-all duration-300 ease-out shadow-glow ${open ? 'w-72' : 'w-16'}`}
    >
      <div className="flex items-center gap-2 p-3">
        <button
          onClick={() => setOpen(!open)}
          className="rounded-lg border border-neutral-800 hover:border-neutral-700 p-2 transition"
          aria-label="Toggle sidebar"
        >
          <BookOpen className="w-5 h-5" />
        </button>
        <span className={`text-sm font-medium transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          LearnX
        </span>
      </div>

      <div className="px-2">
        <Link to="/new" className="group flex items-center gap-3 px-2 py-2 rounded-lg border border-neutral-800 hover:border-neutral-700 mt-2">
          <div className="rounded-md p-1.5 border border-neutral-800 group-hover:border-neutral-700 transition">
            <Plus className="w-4 h-4" />
          </div>
          <span className={`text-sm transition-all ${open ? 'opacity-100' : 'opacity-0 hidden'}`}>New</span>
        </Link>
      </div>

      <div className="mt-4 px-2 text-xs uppercase tracking-wider text-neutral-400">
        <span className={`${open ? 'opacity-100' : 'opacity-0 hidden'}`}>Recent</span>
      </div>
      <div className="flex-1 overflow-auto px-2 py-2 space-y-1">
        {/* Placeholder recent items */}
        {[
          { to: '/new', label: 'Start a lesson', icon: <Library className="w-4 h-4" /> },
          { to: '/new', label: 'Plan a course', icon: <Settings2 className="w-4 h-4" /> },
        ].map((item, idx) => (
          <Link key={idx} to={item.to}
            className={`flex items-center gap-3 px-2 py-2 rounded-lg border border-neutral-900 hover:border-neutral-700 transition
                       ${location.pathname === item.to ? 'border-neutral-700' : ''}`}>
            <div className="rounded-md p-1.5 border border-neutral-800">
              {item.icon}
            </div>
            <span className={`text-sm transition-all ${open ? 'opacity-100' : 'opacity-0 hidden'}`}>{item.label}</span>
          </Link>
        ))}
      </div>

      <div className="p-2">
        <button onClick={logout}
          className="w-full flex items-center gap-3 px-2 py-2 rounded-lg border border-neutral-800 hover:border-neutral-700">
          <div className="rounded-md p-1.5 border border-neutral-800">
            <LogOut className="w-4 h-4" />
          </div>
          <span className={`text-sm ${open ? 'opacity-100' : 'opacity-0 hidden'}`}>Logout</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
