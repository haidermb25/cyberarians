'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { BookOpen, Loader2, Lock, Shield } from 'lucide-react'

export default function AdminLoginPage() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username.trim(), password }),
      })

      const data = await response.json().catch(() => ({}))

      if (response.ok) {
        router.push('/admin/dashboard')
        router.refresh()
        return
      }

      setError(
        typeof data.error === 'string' ? data.error : 'Invalid username or password',
      )
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-12">
      {/* Background */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-slate-900"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(255,255,255,0.18),transparent_55%)]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20width=%2240%22%20height=%2240%22%20viewBox=%220%200%2040%2040%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.04%22%3E%3Cpath%20d=%22M0%2038.59l2.83-2.83%201.41%201.41L1.41%2040H0v-1.41zM0%201.4l2.83%202.83%201.41-1.41L1.41%200H0v1.41zM38.59%2040l-2.83-2.83%201.41-1.41L40%2038.59V40h-1.41zM40%201.41l-2.83%202.83-1.41-1.41L38.59%200H40v1.41zM20%2018.6l2.83-2.83%201.41%201.41L21.41%2020l2.83%202.83-1.41%201.41L20%2021.41l-2.83%202.83-1.41-1.41L18.59%2020l-2.83-2.83%201.41-1.41L20%2018.59z%22/%3E%3C/g%3E%3C/svg%3E')] opacity-90"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="flex flex-col items-center mb-8 text-center">
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15 ring-2 ring-white/25 shadow-lg backdrop-blur-sm">
            <BookOpen className="h-8 w-8 text-white" strokeWidth={2.25} />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
            Cybrarian Admin
          </h1>
          <p className="mt-2 text-sm text-white/75">
            Sign in to manage researchers, communities, and roles
          </p>
        </div>

        <Card className="border-0 bg-white/95 shadow-2xl shadow-black/25 backdrop-blur-xl dark:bg-card/95">
          <div className="p-8 sm:p-9">
            <div className="mb-6 flex items-center gap-2 text-primary">
              <Shield className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Secure access
              </span>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="admin-username">Username</Label>
                <Input
                  id="admin-username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading}
                  className="h-11 border-2 border-primary/35 bg-background shadow-sm focus-visible:border-primary focus-visible:ring-primary/30"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none"
                    aria-hidden
                  />
                  <Input
                    id="admin-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="h-11 border-2 border-primary/35 bg-background pl-10 shadow-sm focus-visible:border-primary focus-visible:ring-primary/30"
                  />
                </div>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-destructive/25 bg-destructive/10 px-4 py-3 text-sm text-destructive"
                >
                  {error}
                </div>
              )}

              <Button
                type="submit"
                className="h-11 w-full text-base font-semibold shadow-md"
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {loading ? 'Signing in…' : 'Sign in'}
              </Button>
            </form>

            <div className="mt-8 border-t pt-6 text-center">
              <Link
                href="/"
                className="text-sm font-medium text-muted-foreground underline-offset-4 transition hover:text-foreground hover:underline"
              >
                ← Back to website
              </Link>
            </div>
          </div>
        </Card>

        <p className="mt-8 text-center text-xs text-white/50">
          Protected area. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  )
}
