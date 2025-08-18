import React from 'react'
import { useLocation, useParams } from 'react-router-dom'

const CourseView: React.FC = () => {
  const { state } = useLocation() as any
  const params = useParams()
  const data = state as { id: number; topic: string; duration_weeks: number; syllabus: any }

  if (!data) {
    return <div className="p-6">Open a course from the New page.</div>
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto space-y-4">
        <h2 className="text-2xl font-semibold">{data.syllabus.course_title || `Course: ${data.topic}`}</h2>
        {data.syllabus.weeks?.map((w: any, i: number) => (
          <div key={i} className="bg-black/40 border border-neutral-800 rounded-xl p-4 shadow-glow">
            <h3 className="text-lg font-medium mb-2">{w.title}</h3>
            <ul className="grid gap-2">
              {w.lessons?.map((l: any, idx: number) => (
                <li key={idx} className="text-sm bg-neutral-900 border border-neutral-800 rounded px-3 py-2 flex justify-between">
                  <span>{l.title}</span>
                  <span className="text-neutral-400">{l.outcome}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
export default CourseView
