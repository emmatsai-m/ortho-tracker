import { useState, type FormEvent } from 'react'
import { Navigate } from 'react-router-dom'
import { authErrorMessage } from '../auth/authErrors'
import { useAuth } from '../auth/useAuth'

const inputClass =
  'w-full rounded-xl border border-line bg-card px-4 py-3 text-base text-ink placeholder:text-steel/60'

export default function Login() {
  const { user, loading, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  if (!loading && user) return <Navigate to="/" replace />

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
    } catch (err) {
      setError(authErrorMessage(err))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="mx-auto flex min-h-dvh max-w-sm flex-col justify-center px-6 py-10">
      <h1 className="text-2xl font-bold">矯正紀錄</h1>
      <p className="mt-1 text-sm text-steel">請登入以查看你的紀錄</p>

      <form onSubmit={onSubmit} className="mt-8 space-y-4">
        <div>
          <label htmlFor="email" className="mb-1 block text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-sm font-medium">
            密碼
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`${inputClass} pr-16`}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="absolute inset-y-0 right-0 px-4 text-sm font-medium text-tide-deep"
              aria-pressed={showPassword}
            >
              {showPassword ? '隱藏' : '顯示'}
            </button>
          </div>
        </div>

        {error && (
          <p role="alert" className="rounded-xl bg-amber/10 px-4 py-3 text-sm text-amber">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-xl bg-tide py-3 text-base font-bold text-white active:bg-tide-deep disabled:opacity-60"
        >
          {submitting ? '登入中…' : '登入'}
        </button>
      </form>
    </main>
  )
}
