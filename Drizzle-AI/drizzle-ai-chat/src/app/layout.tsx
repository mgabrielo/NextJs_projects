import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Drizzle Chat',
}
// NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_cG93ZXJmdWwtZ2FyLTcxLmNsZXJrLmFjY291bnRzLmRldiQ
// CLERK_SECRET_KEY=sk_test_qezo8cxp1Obmhhi8ShqTEbwVwSaz2sy27WC5rtMhcn

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider >
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
    </ClerkProvider>
  )
}
