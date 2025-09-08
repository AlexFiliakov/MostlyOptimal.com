import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ergodicity Advantage - See Your Future, Not the Average',
  description: 'Transform risk management from necessary cost to growth accelerator with a simulation engine built for how businesses actually succeed.',
  keywords: 'ergodicity, risk management, insurance optimization, business simulation, growth strategy',
  openGraph: {
    title: 'Ergodicity Advantage',
    description: 'Transform risk management from necessary cost to growth accelerator',
    url: 'https://ergodicityadvantage.com',
    siteName: 'Ergodicity Advantage',
    images: [
      {
        url: '/images/sailboat_ocean.jpg',
        width: 1200,
        height: 630,
        alt: 'Ergodicity Advantage',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ergodicity Advantage',
    description: 'Transform risk management from necessary cost to growth accelerator',
    images: ['/images/sailboat_ocean.jpg'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}