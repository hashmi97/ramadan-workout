import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { seedUserPlan } from '../services/planService'

interface AuthContextType {
  user: User | null
  loading: boolean
  seeded: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  seeded: false,
})

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [seeded, setSeeded] = useState(false)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!user || seeded) return

    let cancelled = false
    seedUserPlan(user.id)
      .then(() => {
        if (!cancelled) setSeeded(true)
      })
      .catch((err) => {
        console.error('Seed failed:', err)
      })

    return () => {
      cancelled = true
    }
  }, [user, seeded])

  return (
    <AuthContext.Provider value={{ user, loading, seeded }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
