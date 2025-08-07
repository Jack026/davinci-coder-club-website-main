import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
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
  description: 'Join Da-Vinci Coder Club at Assam Down Town University - a premier student coding community with 150+ innovators, 75+ projects, and 25+ hackathon victories. Transform ideas into digital masterpieces.',
  keywords: [
    'coding club ADTU', 
    'programming community Assam', 
    'Assam Down Town University technology', 
    'hackathon Guwahati', 
    'web development club', 
    'AI programming', 
    'student innovation hub', 
    'tech community northeast India',
    'Jack026',
    'Da-Vinci coders'
  ],
  authors: [{ name: 'Jack026', url: 'https://github.com/jack026' }],
  creator: 'Da-Vinci Coder Club',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://davincicoders.club',
    title: 'Da-Vinci Coder Club | Innovation Hub at ADTU',
    description: 'Join 150+ innovators at ADTU\'s premier coding club. 75+ projects, 25+ hackathon wins, and endless opportunities to transform ideas into reality.',
    siteName: 'Da-Vinci Coder Club',
    images: [
      {
        url: '/images/og/davinci-club-home.jpg',
        width: 1200,
        height: 630,
        alt: 'Da-Vinci Coder Club - Where Art Meets Code at ADTU'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Da-Vinci Coder Club | ADTU Innovation Hub',
    description: 'Where creativity meets code. Join ADTU\'s premier tech community with 150+ members and 75+ innovative projects.',
    creator: '@davinci_coders',
    images: ['/images/og/davinci-club-twitter.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: '/icon.svg',
      },
    ]
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
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        <link rel="manifest" href="/manifest.json" />
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        <meta name="theme-color" content="#6366f1" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />

        {/* Enhanced JSON-LD Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Da-Vinci Coder Club",
              "url": "https://davincicoders.club",
              "logo": "https://davincicoders.club/images/logo-512x512.png",
              "description": "Premier coding club at Assam Down Town University fostering innovation, creativity, and technical excellence among students.",
              "foundingDate": "2021",
              "founder": {
                "@type": "Person",
                "name": "Jack026"
              },
              "memberOf": {
                "@type": "EducationalOrganization",
                "name": "Assam Down Town University"
              }
            })
          }}
        />

        {/* Ultra-Cool CSS Animations */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Ultra-Cool Background Animations */
            @keyframes float {
              0%, 100% { transform: translateY(0px) rotate(0deg); }
              33% { transform: translateY(-30px) rotate(120deg); }
              66% { transform: translateY(-15px) rotate(240deg); }
            }

            @keyframes pulse-glow {
              0%, 100% { box-shadow: 0 0 20px rgba(99, 102, 241, 0.3); }
              50% { box-shadow: 0 0 40px rgba(244, 63, 94, 0.5), 0 0 60px rgba(99, 102, 241, 0.3); }
            }

            @keyframes matrix-rain {
              0% { transform: translateY(-100vh) rotateX(0deg); opacity: 1; }
              100% { transform: translateY(100vh) rotateX(360deg); opacity: 0; }
            }

            @keyframes gradient-shift {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }

            @keyframes code-scroll {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100vw); }
            }

            @keyframes orbit {
              0% { transform: rotate(0deg) translateX(150px) rotate(0deg); }
              100% { transform: rotate(360deg) translateX(150px) rotate(-360deg); }
            }

            @keyframes neon-flicker {
              0%, 100% { text-shadow: 0 0 10px #6366f1, 0 0 20px #6366f1, 0 0 30px #6366f1; }
              50% { text-shadow: 0 0 5px #f43f5e, 0 0 15px #f43f5e, 0 0 25px #f43f5e; }
            }

            /* Global Styles */
            * {
              box-sizing: border-box;
            }

            body {
              margin: 0;
              padding: 0;
              overflow-x: hidden;
            }

            /* Custom Scrollbar */
            ::-webkit-scrollbar {
              width: 8px;
            }

            ::-webkit-scrollbar-track {
              background: rgba(15, 23, 42, 0.1);
            }

            ::-webkit-scrollbar-thumb {
              background: linear-gradient(45deg, #6366f1, #f43f5e);
              border-radius: 4px;
            }

            ::-webkit-scrollbar-thumb:hover {
              background: linear-gradient(45deg, #4f46e5, #e11d48);
            }

            /* Selection */
            ::selection {
              background: rgba(99, 102, 241, 0.3);
              color: #ffffff;
            }
          `
        }} />
      </head>
      
      <body className="font-primary antialiased bg-slate-950 text-white overflow-x-hidden relative">
        {/* EPIC ANIMATED BACKGROUND LAYERS */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Layer 1: Animated Gradient Mesh */}
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              background: 'linear-gradient(-45deg, #0f172a, #1e293b, #334155, #475569)',
              backgroundSize: '400% 400%',
              animation: 'gradient-shift 15s ease infinite'
            }}
          />

          {/* Layer 2: Matrix Rain Effect */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 50 }, (_, i) => (
              <div
                key={`matrix-${i}`}
                className="absolute text-green-400/30 font-mono text-sm"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animation: 'matrix-rain 8s linear infinite'
                }}
              >
                {['0', '1', '0', '1', '0', '1', '0', '1'].join('')}
              </div>
            ))}
          </div>

          {/* Layer 3: Floating Code Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={`code-${i}`}
                className="absolute text-purple-400/20 font-mono font-bold"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  fontSize: `${12 + Math.random() * 8}px`,
                  animationDelay: `${Math.random() * 10}s`,
                  animation: 'float 20s ease-in-out infinite'
                }}
              >
                {[
                  '{ }', '< >', '[ ]', '( )', '=>', '&&', '||', '!=', '===', 
                  'const', 'let', 'var', 'function', 'class', 'import', 'export',
                  'React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'HTML',
                  'AI', 'ML', 'API', 'JWT', 'HTTP', 'REST', 'GraphQL'
                ][Math.floor(Math.random() * 27)]}
              </div>
            ))}
          </div>

          {/* Layer 4: Glowing Orbs */}
          <div className="absolute inset-0">
            {Array.from({ length: 8 }, (_, i) => (
              <div
                key={`orb-${i}`}
                className="absolute rounded-full"
                style={{
                  left: `${20 + Math.random() * 60}%`,
                  top: `${20 + Math.random() * 60}%`,
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                  background: `radial-gradient(circle, ${
                    ['rgba(99, 102, 241, 0.3)', 'rgba(244, 63, 94, 0.3)', 'rgba(6, 182, 212, 0.3)', 'rgba(139, 92, 246, 0.3)'][
                      Math.floor(Math.random() * 4)
                    ]
                  }, transparent)`,
                  animationDelay: `${Math.random() * 5}s`,
                  animation: 'pulse-glow 4s ease-in-out infinite'
                }}
              />
            ))}
          </div>

          {/* Layer 5: Scrolling Code Lines */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            {Array.from({ length: 10 }, (_, i) => (
              <div
                key={`scroll-${i}`}
                className="absolute whitespace-nowrap text-cyan-400 font-mono text-xs"
                style={{
                  top: `${i * 10}%`,
                  animationDelay: `${i * 2}s`,
                  animation: 'code-scroll 25s linear infinite'
                }}
              >
                {`const innovation = () => { return 'Da-Vinci Coder Club'; }; // Where Art Meets Code`}
              </div>
            ))}
          </div>

          {/* Layer 6: Geometric Patterns */}
          <div className="absolute inset-0">
            <svg className="w-full h-full opacity-5" viewBox="0 0 100 100">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>

          {/* Layer 7: Orbiting Elements */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
              {Array.from({ length: 6 }, (_, i) => (
                <div
                  key={`orbit-${i}`}
                  className="absolute w-2 h-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                  style={{
                    animationDelay: `${i * 2}s`,
                    animation: 'orbit 20s linear infinite'
                  }}
                />
              ))}
            </div>
          </div>

          {/* Layer 8: Particle System */}
          <div className="absolute inset-0">
            {Array.from({ length: 100 }, (_, i) => (
              <div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 10}s`,
                  animation: 'float 15s ease-in-out infinite'
                }}
              />
            ))}
          </div>
        </div>

        {/* Ultra-Modern Content Wrapper */}
        <div id="root-content" className="relative z-10 min-h-screen">
          {/* Glassmorphism Overlay */}
          <div className="fixed inset-0 z-[1] pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 via-transparent to-slate-900/30 backdrop-blur-[0.5px]" />
          </div>

          {/* Main Content */}
          <main id="main-content" role="main" className="relative z-10">
            {children}
          </main>
        </div>

        {/* Enhanced Performance Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Smooth scroll polyfill
              if (!('scrollBehavior' in document.documentElement.style)) {
                const script = document.createElement('script');
                script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
                document.head.appendChild(script);
              }

              // Performance optimizations
              document.addEventListener('DOMContentLoaded', function() {
                // Reduce animations on slower devices
                if (navigator.hardwareConcurrency < 4) {
                  document.documentElement.style.setProperty('--animation-duration', '0.3s');
                }

                // Intersection Observer for performance
                const observerOptions = {
                  root: null,
                  rootMargin: '0px',
                  threshold: 0.1
                };

                const observer = new IntersectionObserver((entries) => {
                  entries.forEach(entry => {
                    if (entry.isIntersecting) {
                      entry.target.classList.add('animate-in');
                    }
                  });
                }, observerOptions);

                // Observe all animated elements
                document.querySelectorAll('[data-animate]').forEach(el => {
                  observer.observe(el);
                });
              });

              // Service Worker for PWA
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `
          }}
        />

        {/* CSS Variables for Dynamic Theming */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              document.documentElement.style.setProperty('--primary-rgb', '99, 102, 241');
              document.documentElement.style.setProperty('--secondary-rgb', '244, 63, 94');
              document.documentElement.style.setProperty('--accent-rgb', '6, 182, 212');
            `
          }}
        />
      </body>
    </html>
  )
}
