import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AppProvider } from '@/contexts/AppContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Ocean Factory - Système de Facturation',
  description: 'Application de gestion de facturation pour Ocean Factory',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>
        <AppProvider>
          <div className="min-h-screen bg-gray-50">
            {children}
          </div>
        </AppProvider>
      </body>
    </html>
  )
}