'use client'

import { useState, useEffect } from 'react'
import { getTimeUntilDeadline } from '@/lib/utils'

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    expired: false
  })
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    // Set initial time and mark as client-side
    setIsClient(true)
    setTimeLeft(getTimeUntilDeadline())

    const timer = setInterval(() => {
      setTimeLeft(getTimeUntilDeadline())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Don't render countdown until client-side hydration is complete
  if (!isClient) {
    return (
      <div className="text-center p-12 bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-sm border border-orange-400/20 rounded-3xl max-w-4xl mx-auto hover-glow">
        <h3 className="font-righteous text-3xl text-white mb-4 text-glow">⏰ Registration Deadline ⏰</h3>
        <p className="font-poppins text-orange-200 mb-8">Time is ticking! Don't miss out!</p>
        <div className="grid grid-cols-4 gap-8">
          <div className="text-center bg-white/5 rounded-2xl p-6 hover-lift">
            <div className="font-orbitron text-5xl font-bold text-white mb-2 text-glow">--</div>
            <div className="text-sm text-orange-200 uppercase tracking-wider font-poppins font-semibold">Days</div>
          </div>
          <div className="text-center bg-white/5 rounded-2xl p-6 hover-lift">
            <div className="font-orbitron text-5xl font-bold text-white mb-2 text-glow">--</div>
            <div className="text-sm text-orange-200 uppercase tracking-wider font-poppins font-semibold">Hours</div>
          </div>
          <div className="text-center bg-white/5 rounded-2xl p-6 hover-lift">
            <div className="font-orbitron text-5xl font-bold text-white mb-2 text-glow">--</div>
            <div className="text-sm text-orange-200 uppercase tracking-wider font-poppins font-semibold">Minutes</div>
          </div>
          <div className="text-center bg-white/5 rounded-2xl p-6 hover-lift">
            <div className="font-orbitron text-5xl font-bold text-white mb-2 text-glow">--</div>
            <div className="text-sm text-orange-200 uppercase tracking-wider font-poppins font-semibold">Seconds</div>
          </div>
        </div>
        <p className="text-orange-300 mt-8 font-poppins">Loading countdown... 🚀</p>
      </div>
    )
  }

  if (timeLeft.expired) {
    return (
      <div className="text-center p-8 bg-red-900/20 border border-red-500 rounded-lg">
        <h3 className="text-2xl font-bold text-red-400 mb-2">Registration Closed</h3>
        <p className="text-red-300">The registration deadline has passed.</p>
      </div>
    )
  }

  return (
    <div className="text-center p-12 bg-gradient-to-br from-orange-500/10 to-red-600/10 backdrop-blur-sm border border-orange-400/20 rounded-3xl max-w-4xl mx-auto hover-glow scroll-fade-in">
      <h3 className="font-righteous text-3xl text-white mb-4 text-glow">⏰ Registration Deadline ⏰</h3>
      <p className="font-poppins text-orange-200 mb-8">Time is ticking! Don't miss out!</p>
      <div className="grid grid-cols-4 gap-8">
        <div className="text-center bg-white/5 rounded-2xl p-6 hover-lift tilt-hover">
          <div className="font-orbitron text-5xl font-bold text-white mb-2 text-glow">{timeLeft.days}</div>
          <div className="text-sm text-orange-200 uppercase tracking-wider font-poppins font-semibold">Days</div>
        </div>
        <div className="text-center bg-white/5 rounded-2xl p-6 hover-lift tilt-hover">
          <div className="font-orbitron text-5xl font-bold text-white mb-2 text-glow">{timeLeft.hours}</div>
          <div className="text-sm text-orange-200 uppercase tracking-wider font-poppins font-semibold">Hours</div>
        </div>
        <div className="text-center bg-white/5 rounded-2xl p-6 hover-lift tilt-hover">
          <div className="font-orbitron text-5xl font-bold text-white mb-2 text-glow">{timeLeft.minutes}</div>
          <div className="text-sm text-orange-200 uppercase tracking-wider font-poppins font-semibold">Minutes</div>
        </div>
        <div className="text-center bg-white/5 rounded-2xl p-6 hover-lift tilt-hover">
          <div className="font-orbitron text-5xl font-bold text-white mb-2 text-glow">{timeLeft.seconds}</div>
          <div className="text-sm text-orange-200 uppercase tracking-wider font-poppins font-semibold">Seconds</div>
        </div>
      </div>
      <p className="text-orange-300 mt-8 font-poppins font-medium">
        🚀 Register before December 10, 2025 🚀
      </p>
    </div>
  )
}
