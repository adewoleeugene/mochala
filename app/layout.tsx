import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
})

export const metadata: Metadata = {
  title: 'Mocha - Send, spend, and earn with stablecoins on WhatsApp',
  description: 'Experience instant money transfers from anywhere to Sierra Leone at the best rates. Send USDC via WhatsApp, no registration needed.',
  keywords: 'money transfer, Sierra Leone, WhatsApp, USDC, stablecoin, remittance, blockchain',
  authors: [{ name: 'Mocha Team' }],
  openGraph: {
    title: 'Mocha - Send, spend, and earn with stablecoins on WhatsApp',
    description: 'Experience instant money transfers from anywhere to Sierra Leone at the best rates.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mocha - Send, spend, and earn with stablecoins on WhatsApp',
    description: 'Experience instant money transfers from anywhere to Sierra Leone at the best rates.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  )
}
