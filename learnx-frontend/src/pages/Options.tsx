import React, { useState } from 'react'
import { generateLesson, generateCourse } from '../lib/api'
import { useNavigate } from 'react-router-dom'

const Options: React.FC = () => {
  const [topic, setTopic] = useState('Binary Trees')
  const [mode, setMode] = useState<'lesson'|'course'>('lesson')
  const [level, setLevel] = useState('beginner')
  const [duration, setDuration] = useState(2)
  const [goals, setGoals] = useState('Build intuition and practice with a tiny project.')
  const [loading, setLoading] = useState(false)
  const nav = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'lesson') {
        const out = await generateLesson(topic, level, goals)
        nav(`/lesson/${out.id}`, { state: out })
      } else {
        const out = await generateCourse(topic, duration, goals)
        nav(`/course/${out.id}`, { state: out })
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-6">
      <div className="max-w-2xl mx-auto bg-black/40 border border-neutral-800 rounded-xl p-6 shadow-glow">
        <h2 className="text-lg font-medium mb-2">What do you want to learn today?</h2>
        <p className="text-neutral-400 mb-4">Tell LearnX a topic and choose a quick Lesson or a multi-week Course.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm">Topic</label>
            <input value={topic} onChange={e=>setTopic(e.target.value)} placeholder="e.g., Graph Algorithms"
              className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 outline-none focus:border-neutral-600" />
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={()=>setMode('lesson')}
              className={`flex-1 rounded-lg border px-3 py-2 ${mode==='lesson'?'border-neutral-600':'border-neutral-800 hover:border-neutral-700'}`}>
              Lesson
            </button>
            <button type="button" onClick={()=>setMode('course')}
              className={`flex-1 rounded-lg border px-3 py-2 ${mode==='course'?'border-neutral-600':'border-neutral-800 hover:border-neutral-700'}`}>
              Course
            </button>
          </div>

          {mode==='lesson' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Level</label>
                <select value={level} onChange={e=>setLevel(e.target.value)}
                        className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2">
                  <option>beginner</option>
                  <option>intermediate</option>
                  <option>advanced</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm">Goals (optional)</label>
                <input value={goals} onChange={e=>setGoals(e.target.value)} className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"/>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="text-sm">Duration (weeks)</label>
                <input type="number" min={1} max={12} value={duration} onChange={e=>setDuration(Number(e.target.value))}
                  className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"/>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm">Goals (optional)</label>
                <input value={goals} onChange={e=>setGoals(e.target.value)} className="w-full mt-1 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2"/>
              </div>
            </div>
          )}

          <div className="pt-2">
            <button disabled={loading} className="rounded-lg border border-neutral-700 hover:border-neutral-600 px-4 py-2">
              {loading ? 'Thinking…' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
export default Options
