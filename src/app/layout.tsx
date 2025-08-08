import type { Metadata } from 'next'
import { Fira_Code, Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  variable: '--font-fira-code',
  display: 'swap'
})

export const metadata: Metadata = {
  title: {
    default: 'Da-Vinci Coder Club | Innovation Hub at ADTU',
    template: '%s | Da-Vinci Coder Club'
  },
  description: 'Join Da-Vinci Coder Club at Assam Down Town University - a premier student coding community with 150+ innovators, 75+ projects, and 25+ hackathon victories.',
  keywords: [
    'coding club ADTU', 
    'programming community Assam', 
    'Assam Down Town University technology', 
    'hackathon Guwahati', 
    'web development club', 
    'student innovation hub',
    'Jack026',
    'Da-Vinci coders'
  ],
  authors: [{ name: 'Jack026', url: 'https://github.com/Jack026' }],
  creator: 'Da-Vinci Coder Club',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://davincicoders.club',
    title: 'Da-Vinci Coder Club | Innovation Hub at ADTU',
    description: 'Join 150+ innovators at ADTU\'s premier coding club. 75+ projects, 25+ hackathon wins.',
    siteName: 'Da-Vinci Coder Club',
  },
  robots: {
    index: true,
    follow: true,
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  metadataBase: new URL('https://davincicoders.club'),
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${inter.variable} ${firaCode.variable} scroll-smooth`} 
      suppressHydrationWarning
    >
      <head>
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Completely Clean - No Side Effects */}
        <style dangerouslySetInnerHTML={{
          __html: `
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
              -webkit-font-smoothing: antialiased;
            }

            /* Clean Scrollbar */
            ::-webkit-scrollbar {
              width: 4px;
            }
            @media (min-width: 768px) {
              ::-webkit-scrollbar {
                width: 6px;
              }
            }

            ::-webkit-scrollbar-track {
              background: rgba(15, 23, 42, 0.1);
            }

            ::-webkit-scrollbar-thumb {
              background: linear-gradient(45deg, #6366f1, #f43f5e);
              border-radius: 4px;
            }

            ::selection {
              background: rgba(99, 102, 241, 0.3);
              color: #ffffff;
            }

            /* Reduce motion for accessibility */
            @media (prefers-reduced-motion: reduce) {
              * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
              }
            }
          `
        }} />
      </head>
      
      <body className="font-primary antialiased bg-slate-950 text-white overflow-x-hidden">
        {/* Completely clean wrapper - no classes, no effects */}
        <div className="min-h-screen">
          {/* Direct content - no containers, no constraints */}
          <main className="px-0">
            {children}
          </main>
        </div>

        {/* Minimal Performance Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.addEventListener('DOMContentLoaded', function() {
                const isSlowDevice = navigator.hardwareConcurrency < 4;
                
                if (isSlowDevice) {
                  document.documentElement.style.setProperty('--animation-duration', '0.5s');
                }
              });

              if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                  navigator.serviceWorker.register('/sw.js').catch(() => {});
                });
              }
            `
          }}
        />
      </body>
    </html>
  )
}
