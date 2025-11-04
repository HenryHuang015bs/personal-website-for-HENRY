'use client'

import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global Error:', error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center bg-[hsl(35,67%,95%)] p-8">
          <div className="max-w-md w-full text-center space-y-6">
            <h1 className="text-4xl font-bold text-[#052659]">Something went wrong!</h1>
            <p className="text-lg text-[#052659]/80">
              {error.message || 'An unexpected global error occurred'}
            </p>
            {error.digest && (
              <p className="text-sm text-[#052659]/60">
                Error ID: {error.digest}
              </p>
            )}
            <button
              onClick={reset}
              className="px-6 py-3 bg-[#93C2E2] hover:bg-[#C8E3F5] text-[#052659] rounded-lg font-medium transition-colors duration-200"
            >
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}

