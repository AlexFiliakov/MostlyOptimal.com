import type { Metadata } from 'next'
import Script from 'next/script'
import './globals.css'

export const metadata: Metadata = {
  title: 'Mostly Optimal - See Your Future, Not the Average',
  description: 'Optimize your commercial insurance program with a simulation engine that models your company\'s actual risk, not industry averages. Open-source framework for deductible, limit, and coverage analysis.',
  keywords: 'risk management, insurance optimization, business simulation, growth strategy, long-term value, survivability analysis, commercial insurance, deductible optimization, insurance limit analysis, Monte Carlo simulation, actuarial analysis, insurance program design, risk modeling, corporate insurance, loss modeling, insurance analytics',
  metadataBase: new URL('https://mostlyoptimal.com'),
  openGraph: {
    title: 'Mostly Optimal',
    description: 'Optimize your commercial insurance program with a simulation engine that models your company\'s actual risk, not industry averages.',
    url: 'https://mostlyoptimal.com',
    siteName: 'Mostly Optimal',
    images: [
      {
        url: '/images/sailboat_ocean.webp',
        width: 1200,
        height: 630,
        alt: 'Mostly Optimal',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mostly Optimal',
    description: 'Optimize your commercial insurance program with a simulation engine that models your company\'s actual risk, not industry averages.',
    images: ['/images/sailboat_ocean.webp'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-6CFY9Q60DQ"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-6CFY9Q60DQ');
          `}
        </Script>
      </head>
      <body className="font-body antialiased">
        {children}
      </body>
    </html>
  )
}