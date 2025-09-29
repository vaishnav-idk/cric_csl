import type { Metadata } from 'next'
import { Inter, Poppins, Orbitron, Righteous, Fredoka, Comfortaa, Bebas_Neue, Oswald } from 'next/font/google'
import localFont from 'next/font/local'
import './globals.css'
import ErrorBoundary from '@/components/error-boundary'

// Local Neue Metana Next font
const neueMetana = localFont({
  src: './font/NeueMetanaNext-SemiBold.otf',
  variable: '--font-neue-metana',
  display: 'swap',
  weight: '600',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const orbitron = Orbitron({
  weight: ['400', '500', '600', '700', '800', '900'],
  subsets: ['latin'],
  variable: '--font-orbitron'
})

const righteous = Righteous({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-righteous'
})

const fredoka = Fredoka({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-fredoka'
})

const comfortaa = Comfortaa({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-comfortaa'
})

const bebasNeue = Bebas_Neue({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-bebas-neue'
})

const oswald = Oswald({
  weight: ['200', '300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-oswald'
})

// Climate Crisis font fallback (using Bebas Neue as it has similar characteristics)
const climateCrisis = bebasNeue

// Using Climate Crisis style font for hero
const climateFont = climateCrisis

// Using Fredoka as the Daisy-style font for hero
const daisy = fredoka

// Using Righteous as the primary display font (Dirtyline-style)
const dirtyline = righteous

// Nightly font fallback (using Orbitron as primary since Nightly font file isn't available)
const nightly = orbitron

export const metadata: Metadata = {
  title: 'Dolphin Club Cricket Championship 2025 | CSL Tournament Registration',
  description: 'Register for the Dolphin Club Cricket Championship 2025. T20 cricket tournament for CSL employees with exciting prizes and professional gameplay.',
  keywords: 'cricket, tournament, CSL, registration, T20, championship, sports',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${neueMetana.variable} ${inter.variable} ${poppins.variable} ${orbitron.variable} ${righteous.variable} ${fredoka.variable} ${comfortaa.variable} ${bebasNeue.variable} ${oswald.variable} ${climateCrisis.variable} ${climateFont.variable} ${dirtyline.variable} ${daisy.variable} ${nightly.variable} font-sans min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950`}>
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
