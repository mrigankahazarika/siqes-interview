import { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import api from '../api/axios' // Your axios instance with base URL

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await api.post('/login', { email, password })
      localStorage.setItem('token', response.data.token)
      
      // Navigate to dashboard upon success
      navigate({ to: '/dashboard' })
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials')
    }
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
          <p className="text-sm text-slate-500">Enter your email to sign in</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-3 rounded-md border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none" htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              className="flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="inline-flex items-center justify-center w-full h-10 px-4 py-2 text-sm font-medium text-white transition-colors bg-slate-900 rounded-md hover:bg-slate-800 focus:outline-none"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  )
}