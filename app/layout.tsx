import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: "Eyalane fête ses 1 an",
  description: "Une invitation douce et élégante pour le premier anniversaire d'Eyalane.",
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f5eddf',
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr">
      <body className="antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
