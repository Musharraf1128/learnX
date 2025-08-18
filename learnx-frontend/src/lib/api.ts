import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('lx_token')
  if (token) {
    config.headers = config.headers || {}
    config.headers['Authorization'] = `Bearer ${token}`
  }
  return config
})

export type LessonSection = {
  heading: string
  content: string
  example?: string
  quiz?: { question: string; options: string[]; answer: string }
}

export async function register(email: string, password: string) {
  const res = await api.post('/auth/register', { email, password })
  return res.data
}

export async function login(email: string, password: string) {
  const params = new URLSearchParams()
  params.append('username', email)
  params.append('password', password)
  const res = await api.post('/auth/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  })
  localStorage.setItem('lx_token', res.data.access_token)
  return res.data
}

export async function me() {
  const res = await api.get('/auth/me')
  return res.data
}

export async function generateLesson(topic: string, level: string, goals?: string) {
  const res = await api.post('/generate/lesson', { topic, level, goals })
  return res.data as { id: number; topic: string; level: string; content: { title: string; sections: LessonSection[] } }
}

export async function generateCourse(topic: string, duration_weeks: number, goals?: string) {
  const res = await api.post('/generate/course', { topic, duration_weeks, goals })
  return res.data as { id: number; topic: string; duration_weeks: number; syllabus: any }
}
