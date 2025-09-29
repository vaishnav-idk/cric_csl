'use client'

import { useEffect, useRef } from 'react'

export default function BackgroundParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const createParticle = () => {
      const particle = document.createElement('div')
      particle.className = 'particle particle-float'
      particle.style.left = Math.random() * 100 + '%'
      particle.style.animationDelay = Math.random() * 15 + 's'
      particle.style.animationDuration = (15 + Math.random() * 10) + 's'
      
      // Random colors for particles
      const colors = [
        'rgba(255, 255, 255, 0.1)',
        'rgba(102, 126, 234, 0.2)',
        'rgba(255, 107, 107, 0.2)',
        'rgba(255, 193, 7, 0.2)',
        'rgba(40, 167, 69, 0.2)'
      ]
      particle.style.background = colors[Math.floor(Math.random() * colors.length)]
      
      container.appendChild(particle)

      // Remove particle after animation
      setTimeout(() => {
        if (container.contains(particle)) {
          container.removeChild(particle)
        }
      }, 25000)
    }

    // Create initial particles
    for (let i = 0; i < 20; i++) {
      setTimeout(() => createParticle(), i * 1000)
    }

    // Continue creating particles
    const interval = setInterval(createParticle, 2000)

    return () => {
      clearInterval(interval)
      if (container) {
        container.innerHTML = ''
      }
    }
  }, [])

  return <div ref={containerRef} className="bg-particles" />
}

export function MouseFollowEffect() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const handleMouseMove = (e: MouseEvent) => {
      cursor.style.left = e.clientX + 'px'
      cursor.style.top = e.clientY + 'px'
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed w-6 h-6 bg-white/10 rounded-full pointer-events-none z-50 mix-blend-difference transition-all duration-100"
      style={{ transform: 'translate(-50%, -50%)' }}
    />
  )
}
