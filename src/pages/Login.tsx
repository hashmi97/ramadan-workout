import { useState } from 'react'
import { signInWithMagicLink } from '../services/auth'
import toast from 'react-hot-toast'

export function Login() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return

    setLoading(true)
    try {
      await signInWithMagicLink(email.trim())
      setSent(true)
      toast.success('Check your email for the magic link')
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to send magic link')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-semibold text-stone-900 text-center mb-2">
          Ramadan Cut Tracker
        </h1>
        <p className="text-stone-600 text-center mb-8 text-sm">
          Track your 4-week workout plan
        </p>

        <div className="bg-white rounded-lg border border-stone-200 shadow-sm p-6">
          {sent ? (
            <div className="text-center space-y-4">
              <p className="text-stone-700">
                Check your email for the magic link to sign in.
              </p>
              <button
                type="button"
                onClick={() => setSent(false)}
                className="text-sm text-stone-500 hover:text-stone-700 underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block text-sm font-medium text-stone-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-3 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
                disabled={loading}
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full py-2 px-4 bg-amber-600 text-white font-medium rounded-md hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : 'Send magic link'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
