'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

interface ErrorBoundaryProps {
  error: Error & { digest?: string }
  reset: () => void
}

export function ErrorBoundary({ error, reset }: ErrorBoundaryProps) {
  useEffect(() => {
    console.error('Error caught:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <Card className="w-full max-w-md p-8 space-y-6">
        <div className="flex flex-col items-center space-y-3">
          <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
            <AlertCircle className="text-destructive" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-center">Something went wrong</h2>
          <p className="text-muted-foreground text-center text-sm">
            An unexpected error occurred. Please try again.
          </p>
        </div>

        {process.env.NODE_ENV === 'development' && error?.message && (
          <div className="bg-muted p-3 rounded-md">
            <p className="text-xs font-mono text-muted-foreground break-words">
              {error.message}
            </p>
          </div>
        )}

        <Button onClick={reset} className="w-full">
          Try again
        </Button>
      </Card>
    </div>
  )
}
