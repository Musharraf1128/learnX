import React, { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Options from './pages/Options'
import LessonView from './pages/LessonView'
import CourseView from './pages/CourseView'
import Welcome from './pages/Welcome'
import Login from './pages/Login'
import Register from './pages/Register'
import { AuthProvider, useAuth } from './context/AuthContext'

const Shell: React.FC<{children: React.ReactNode; title?: string}> = ({ children, title }) => {
  const [open, setOpen] = useState(true)
  return (
    <div className="flex">
      <Sidebar open={open} setOpen={setOpen} />
      <div className="min-h-screen flex-1">
        <Topbar onMenu={() => setOpen(!open)} title={title} />
        <main>{children}</main>
      </div>
    </div>
  )
}

const Private: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const { user } = useAuth()
  if (!localStorage.getItem('lx_token')) return <Navigate to="/login" replace />
  return <>{children}</>
}

const AppRoutes = () => (
  <Routes>
    <Route path="/welcome" element={<Welcome />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/new" element={<Private><Shell title="LearnX — New"><Options /></Shell></Private>} />
    <Route path="/lesson/:id" element={<Private><Shell><LessonView /></Shell></Private>} />
    <Route path="/course/:id" element={<Private><Shell><CourseView /></Shell></Private>} />
    <Route path="/" element={<Navigate to="/welcome" replace />} />
    <Route path="*" element={<Navigate to="/welcome" replace />} />
  </Routes>
)

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}
export default App
