import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import type { LessonSection } from '../lib/api'

const LessonView: React.FC = () => {
  const { state } = useLocation() as any
  const params = useParams()
  const data = state as { id: number; topic: string; level: string; content: { title: string; sections: LessonSection[] } }

  if (!data) {
    return <div className="p-6">Open a lesson from the New page.</div>
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold">{data.content.title}</h2>
        {data.content.sections?.map((s, i) => (
          <div key={i} className="bg-black/40 border border-neutral-800 rounded-xl p-4 shadow-glow">
            <h3 className="text-lg font-medium mb-2">{s.heading}</h3>
            <p className="text-neutral-300 leading-relaxed whitespace-pre-wrap">{s.content}</p>
            {s.example && <pre className="mt-3 bg-neutral-900 border border-neutral-800 rounded p-3 overflow-auto text-sm">{s.example}</pre>}
            {s.quiz && (
              <div className="mt-3 border-t border-neutral-800 pt-3">
                <p className="text-sm font-medium mb-2">Quick check</p>
                <p className="text-sm mb-2">{s.quiz.question}</p>
                <ul className="grid gap-2">
                  {s.quiz.options.map((o, idx) => (
                    <li key={idx} className="text-sm bg-neutral-900 border border-neutral-800 rounded px-3 py-2">{o}</li>
                  ))}
                </ul>
                <p className="text-xs text-neutral-400 mt-2">Answer: {s.quiz.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
export default LessonView
