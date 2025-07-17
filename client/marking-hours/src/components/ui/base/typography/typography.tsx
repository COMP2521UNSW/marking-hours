import * as React from "react"

export function H1({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-lg font-semibold">
      {children}
    </h1>
  )
}

export function Text({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-sm">{children}</p>
  )
}
