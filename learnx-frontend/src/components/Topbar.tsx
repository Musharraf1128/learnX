import React from 'react'
import { Menu } from 'lucide-react'

type Props = { onMenu: () => void; title?: string }
const Topbar: React.FC<Props> = ({ onMenu, title }) => {
  return (
    <header className="sticky top-0 z-10 bg-neutral-950/80 backdrop-blur border-b border-neutral-800">
      <div className="h-14 px-4 flex items-center gap-3">
        <button onClick={onMenu} className="rounded-lg border border-neutral-800 hover:border-neutral-700 p-2">
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-sm font-medium">{title || 'LearnX — The learning framework'}</h1>
      </div>
    </header>
  )
}
export default Topbar
