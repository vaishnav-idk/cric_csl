'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Trophy, Users, Star, Award } from 'lucide-react'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'

const carouselImages = [
  {
    id: 1,
    title: "Championship Glory 2024",
    description: "Team Alpha celebrates their victory",
    icon: Trophy,
    gradient: "from-yellow-500 to-orange-600"
  },
  {
    id: 2,
    title: "Team Spirit",
    description: "Amazing teamwork and sportsmanship",
    icon: Users,
    gradient: "from-blue-500 to-purple-600"
  },
  {
    id: 3,
    title: "Best Moments",
    description: "Unforgettable cricket memories",
    icon: Star,
    gradient: "from-green-500 to-teal-600"
  },
  {
    id: 4,
    title: "Award Ceremony",
    description: "Celebrating our champions",
    icon: Award,
    gradient: "from-red-500 to-pink-600"
  },
  {
    id: 5,
    title: "Action Shots",
    description: "Intense cricket moments",
    icon: Trophy,
    gradient: "from-purple-500 to-indigo-600"
  }
]

export default function ImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const scrollRef = useScrollAnimation()

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % carouselImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 10000)
  }

  return (
    <section ref={scrollRef} className="py-24 scroll-fade-in">
      <div className="container mx-auto px-6">
        <h2 className="font-righteous text-4xl text-center text-white mb-4">
          Tournament Highlights
        </h2>
        <p className="text-center text-white/60 mb-16 font-poppins">
          Relive the excitement from previous championships
        </p>
        
        <div className="relative max-w-4xl mx-auto">
          {/* Main Carousel */}
          <div className="relative h-96 rounded-3xl overflow-hidden group">
            <div 
              className="flex transition-transform duration-700 ease-in-out h-full"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {carouselImages.map((image, index) => {
                const IconComponent = image.icon
                return (
                  <div
                    key={image.id}
                    className={`min-w-full h-full bg-gradient-to-br ${image.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    {/* Animated background shapes */}
                    <div className="absolute inset-0">
                      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full morph-bg"></div>
                      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full morph-bg" style={{animationDelay: '2s'}}></div>
                      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white/10 rounded-full morph-bg" style={{animationDelay: '4s'}}></div>
                    </div>
                    
                    <div className="text-center z-10 relative">
                      <div className="mb-6 tilt-hover">
                        <IconComponent className="w-24 h-24 text-white mx-auto text-glow" />
                      </div>
                      <h3 className="font-orbitron text-3xl font-bold text-white mb-4 text-glow">
                        {image.title}
                      </h3>
                      <p className="font-poppins text-lg text-white/90">
                        {image.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover-lift"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300 opacity-0 group-hover:opacity-100 hover-lift"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            {/* Progress Bar */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
              <div className="flex space-x-2">
                {carouselImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex ? 'bg-white w-8' : 'bg-white/50 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="flex justify-center mt-8 space-x-4 overflow-x-auto pb-4">
            {carouselImages.map((image, index) => {
              const IconComponent = image.icon
              return (
                <button
                  key={image.id}
                  onClick={() => goToSlide(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-xl bg-gradient-to-br ${image.gradient} flex items-center justify-center transition-all duration-300 hover-lift ${
                    index === currentIndex 
                      ? 'ring-2 ring-white ring-offset-2 ring-offset-transparent scale-110' 
                      : 'opacity-60 hover:opacity-100'
                  }`}
                >
                  <IconComponent className="w-8 h-8 text-white" />
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
