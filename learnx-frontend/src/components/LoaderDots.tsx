import React from 'react'

const LoaderDots: React.FC = () => {
  return (
    <div className="flex gap-1 items-center justify-center py-2">
      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce [animation-delay:-0.1s]"></span>
      <span className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></span>
    </div>
  )
}
export default LoaderDots
