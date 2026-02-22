import { useState, type ReactNode } from 'react'

const STORAGE_KEY = 'ramadan-cut-tracker-unlocked'

function isPassgateEnabled(): boolean {
  return import.meta.env.VITE_PASSGATE_ENABLED === 'true' || import.meta.env.VITE_PASSGATE_ENABLED === '1'
}

function getExpectedPassword(): string {
  return import.meta.env.VITE_PASSGATE_PASSWORD ?? ''
}

function isUnlocked(): boolean {
  if (!isPassgateEnabled()) return true
  try {
    return sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

function setUnlocked() {
  sessionStorage.setItem(STORAGE_KEY, '1')
}

export function Passgate({ children }: { children: ReactNode }) {
  const [unlocked, setUnlockedState] = useState(isUnlocked)

  if (!isPassgateEnabled()) {
    return <>{children}</>
  }

  if (unlocked) {
    return <>{children}</>
  }

  return <PassgateForm onSuccess={() => setUnlockedState(true)} />
}

function PassgateForm({ onSuccess }: { onSuccess: () => void }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const expected = getExpectedPassword()
    if (!expected) {
      setError('Passgate not configured. Set VITE_PASSGATE_PASSWORD in .env')
      return
    }
    if (password === expected) {
      setUnlocked()
      onSuccess()
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-stone-900 text-center mb-2">
          Ramadan Cut Tracker
        </h1>
        <p className="text-stone-600 text-center mb-8 text-sm">
          Enter password to continue
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
            autoFocus
          />
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}
