import React, { useState } from 'react'
import { login } from '../lib/api'
import { useAuth } from '../context/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

const Login: React.FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const { setUser } = useAuth()
  const nav = useNavigate()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      await login(email, password)
      // Fetch user info after login
      setUser({ id: 0, email }) // lightweight; will be refreshed on reload
      nav('/new')
    } catch (err: any) {
      setError(err?.response?.data?.detail || 'Login failed')
    }
  }

  return (
    <div className="h-full grid place-items-center p-6">
      <form onSubmit={onSubmit} className="w-full max-w-sm bg-black/40 border border-neutral-800 rounded-xl p-6 shadow-glow">
        <h2 className="text-lg font-medium mb-4">Welcome back</h2>
        <label className="text-sm">Email</label>
        <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required
               className="w-full mt-1 mb-3 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 outline-none focus:border-neutral-600" />
        <label className="text-sm">Password</label>
        <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required
               className="w-full mt-1 mb-4 bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 outline-none focus:border-neutral-600" />
        {error && <p className="text-red-400 text-sm mb-2">{error}</p>}
        <button className="w-full rounded-lg border border-neutral-700 hover:border-neutral-600 py-2">Login</button>
        <p className="text-sm text-neutral-400 mt-3">No account? <Link className="underline" to="/register">Register</Link></p>
      </form>
    </div>
  )
}
export default Login
