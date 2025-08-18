import React, { createContext, useContext, useEffect, useState } from 'react'
import { me } from '../lib/api'

type User = { id: number; email: string } | null
type AuthCtx = {
  user: User
  setUser: (u: User) => void
  logout: () => void
}
const Ctx = createContext<AuthCtx | null>(null)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User>(null)

  useEffect(() => {
    const token = localStorage.getItem('lx_token')
    if (!token) return
    me().then(setUser).catch(() => localStorage.removeItem('lx_token'))
  }, [])

  const logout = () => {
    localStorage.removeItem('lx_token')
    setUser(null)
  }

  return <Ctx.Provider value={{ user, setUser, logout }}>{children}</Ctx.Provider>
}

export function useAuth() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
