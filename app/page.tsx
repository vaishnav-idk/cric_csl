'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import CountdownTimer from '@/components/countdown-timer'
import BackgroundParticles, { MouseFollowEffect } from '@/components/background-particles'
import ImageCarousel from '@/components/image-carousel'
import ScrollAnimations from '@/components/scroll-animations'
import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { Trophy, Calendar, MapPin, Users, Star, Award, Clock, Target } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen relative">
      <BackgroundParticles />
      <MouseFollowEffect />
      <ScrollAnimations />
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white rounded-full flex items-center justify-center">
              <Trophy className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
            </div>
            <span className="font-geist text-sm sm:text-lg font-medium text-white">Dolphin Club</span>
          </div>
          <div className="flex space-x-2 sm:space-x-3">
            <Link href="/register">
              <Button size="sm" className="bg-white text-black hover:bg-gray-100 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-4">
                Register
              </Button>
            </Link>
            <Link href="/admin">
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/10 font-medium rounded-lg text-xs sm:text-sm px-3 sm:px-4">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 sm:pt-32 pb-16 sm:pb-24 relative overflow-hidden min-h-screen flex items-center">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 w-full">
          <div className="text-center max-w-7xl mx-auto">
            {/* Tournament Badge */}
            <div className="inline-flex items-center gap-2 sm:gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-6 sm:mb-8 animate-fade-in">
              <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <span className="text-xs sm:text-sm font-medium text-white font-neue-metana">CSL Cricket Championship 2025</span>
            </div>
            
            {/* Hero Title */}
            <h1 className="font-neue-metana text-5xl sm:text-7xl md:text-9xl lg:text-[10rem] xl:text-[14rem] font-semibold text-white mb-6 sm:mb-8 animate-fade-in tracking-tight leading-[0.8] sm:leading-[0.85] uppercase">
              <span className="block text-white drop-shadow-2xl">
                DOLPHIN CLUB
              </span>
              <span className="block font-neue-metana text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-orange-400 mt-1 sm:mt-2 tracking-tight">
                CRICKET CHAMPIONSHIP
              </span>
              <span className="block font-neue-metana text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-semibold text-yellow-400 mt-2 sm:mt-4 drop-shadow-lg tracking-tight">
                2025
              </span>
            </h1>
            
            {/* Tournament Description */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 sm:p-6 mb-8 sm:mb-12 max-w-4xl mx-auto">
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-neue-metana font-normal leading-relaxed px-4">
                Join the premier T20 cricket tournament for CSL employees
                <span className="block mt-2 font-medium text-white text-sm sm:text-base md:text-lg lg:text-xl font-neue-metana">
                  Professional gameplay • Exciting prizes • Unforgettable moments
                </span>
              </p>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center animate-fade-in px-4">
              <Link href="/register">
                <Button size="xl" className="w-full sm:w-auto bg-gradient-to-r from-orange-500 to-red-600 text-white hover:from-orange-600 hover:to-red-700 font-bold px-8 sm:px-16 py-6 sm:py-8 h-auto text-xl sm:text-2xl rounded-2xl transition-all duration-300 hover:scale-105 shadow-2xl">
                  🏏 Register Now
                </Button>
              </Link>
              <Button variant="outline" size="xl" className="w-full sm:w-auto border-2 border-white/30 text-white hover:bg-white/10 font-semibold px-8 sm:px-12 py-6 sm:py-8 h-auto text-base sm:text-lg rounded-2xl">
                📋 Tournament Details
              </Button>
            </div>
          </div>
        </div>
        
        {/* Subtle Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.02] to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-32 sm:w-64 h-32 sm:h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-white/[0.01] rounded-full blur-3xl"></div>
      </section>

      {/* Tournament Info Cards */}
      <section className="py-16 sm:py-24 scroll-fade-in">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="font-fredoka text-2xl sm:text-3xl md:text-4xl font-bold text-center text-white mb-12 sm:mb-16">
            Tournament Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover-lift group">
              <Calendar className="w-10 h-10 sm:w-12 sm:h-12 text-orange-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-comfortaa text-base sm:text-lg font-bold text-white mb-2">Tournament Dates</h3>
              <p className="text-white/80 font-poppins font-semibold text-sm sm:text-base lg:text-lg">December 15-22, 2025</p>
              <p className="text-xs sm:text-sm text-white/50 mt-1 font-poppins">8 days of cricket action 🏏</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover-lift group">
              <MapPin className="w-10 h-10 sm:w-12 sm:h-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-comfortaa text-base sm:text-lg font-bold text-white mb-2">Venue</h3>
              <p className="text-white/80 font-poppins font-semibold text-sm sm:text-base lg:text-lg">CSL Sports Complex</p>
              <p className="text-xs sm:text-sm text-white/50 mt-1 font-poppins">Professional ground 🏟️</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover-lift group">
              <Target className="w-10 h-10 sm:w-12 sm:h-12 text-green-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-comfortaa text-base sm:text-lg font-bold text-white mb-2">Format</h3>
              <p className="text-white/80 font-poppins font-semibold text-sm sm:text-base lg:text-lg">T20 Cricket</p>
              <p className="text-xs sm:text-sm text-white/50 mt-1 font-poppins">20 overs per side ⚡</p>
            </div>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 sm:p-8 rounded-2xl text-center hover:bg-white/10 transition-all duration-300 hover-lift group">
              <Users className="w-10 h-10 sm:w-12 sm:h-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-comfortaa text-base sm:text-lg font-bold text-white mb-2">Participants</h3>
              <p className="text-white/80 font-poppins font-semibold text-sm sm:text-base lg:text-lg">CSL Employees</p>
              <p className="text-xs sm:text-sm text-white/50 mt-1 font-poppins">Exclusive tournament 👥</p>
            </div>
          </div>
        </div>
      </section>

      {/* Countdown Timer Section */}
      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <CountdownTimer />
        </div>
      </section>

      {/* Prize Section */}
      <section className="py-24 scroll-fade-in">
        <div className="container mx-auto px-6 text-center">
          <h2 className="font-righteous text-5xl text-white mb-8 text-glow">
            💰 Prize Pool 💰
          </h2>
          <p className="font-poppins text-xl text-white/70 mb-16">Win big and make history!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 backdrop-blur-sm border border-yellow-400/30 p-10 rounded-3xl hover:from-yellow-500/30 hover:to-orange-600/30 transition-all duration-300 hover-lift hover-glow tilt-hover group">
              <Award className="w-16 h-16 text-yellow-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 text-glow" />
              <h3 className="font-orbitron text-2xl font-bold text-yellow-400 mb-4">🏆 Winner</h3>
              <p className="font-nightly text-5xl font-bold text-white mb-2 text-glow">₹50,000</p>
              <p className="text-yellow-200 font-poppins font-medium">+ Championship Trophy</p>
            </div>
            <div className="bg-gradient-to-br from-gray-400/20 to-gray-600/20 backdrop-blur-sm border border-gray-400/30 p-10 rounded-3xl hover:from-gray-400/30 hover:to-gray-600/30 transition-all duration-300 hover-lift hover-glow tilt-hover group">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-orbitron text-2xl font-bold text-gray-300 mb-4">🥈 Runner-up</h3>
              <p className="font-nightly text-5xl font-bold text-white mb-2">₹25,000</p>
              <p className="text-gray-200 font-poppins font-medium">+ Silver Trophy</p>
            </div>
            <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 backdrop-blur-sm border border-orange-400/30 p-10 rounded-3xl hover:from-orange-600/30 hover:to-red-600/30 transition-all duration-300 hover-lift hover-glow tilt-hover group">
              <Trophy className="w-16 h-16 text-orange-400 mx-auto mb-6 group-hover:scale-110 transition-transform duration-300" />
              <h3 className="font-orbitron text-2xl font-bold text-orange-400 mb-4">🥉 3rd Place</h3>
              <p className="font-nightly text-5xl font-bold text-white mb-2">₹15,000</p>
              <p className="text-orange-200 font-poppins font-medium">+ Bronze Trophy</p>
            </div>
          </div>
          
          <div>
            <p className="text-white/60 mb-8 font-poppins text-lg">🌟 Individual Awards 🌟</p>
            <div className="flex flex-wrap justify-center gap-4">
              <span className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 border border-blue-400/30 px-8 py-3 rounded-full text-blue-200 font-poppins font-medium hover-lift tilt-hover">🏏 Best Batsman</span>
              <span className="bg-gradient-to-r from-green-500/20 to-green-600/20 border border-green-400/30 px-8 py-3 rounded-full text-green-200 font-poppins font-medium hover-lift tilt-hover">⚡ Best Bowler</span>
              <span className="bg-gradient-to-r from-purple-500/20 to-purple-600/20 border border-purple-400/30 px-8 py-3 rounded-full text-purple-200 font-poppins font-medium hover-lift tilt-hover">🎯 Best All-Rounder</span>
              <span className="bg-gradient-to-r from-red-500/20 to-red-600/20 border border-red-400/30 px-8 py-3 rounded-full text-red-200 font-poppins font-medium hover-lift tilt-hover">🧤 Best Wicket Keeper</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tournament Rules */}
      <section className="py-16 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-white text-center mb-12">Tournament Rules</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-bold text-blue-400 mb-4">Eligibility</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Must be a current CSL employee</li>
                <li>• Valid employee code required</li>
                <li>• Age limit: 18-50 years</li>
                <li>• Medical fitness certificate required</li>
              </ul>
            </div>
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-bold text-green-400 mb-4">Team Formation</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Teams will be formed by organizers</li>
                <li>• Balanced team composition</li>
                <li>• 11 players per team + 4 substitutes</li>
                <li>• Mix of batsmen, bowlers, all-rounders</li>
              </ul>
            </div>
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-bold text-purple-400 mb-4">Match Format</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• T20 format (20 overs per side)</li>
                <li>• Powerplay: First 6 overs</li>
                <li>• Maximum 4 overs per bowler</li>
                <li>• DRS available in knockout stages</li>
              </ul>
            </div>
            <div className="glass-effect p-6 rounded-lg">
              <h3 className="text-xl font-bold text-red-400 mb-4">Equipment</h3>
              <ul className="space-y-2 text-blue-200">
                <li>• Cricket kit provided by organizers</li>
                <li>• Personal protective gear recommended</li>
                <li>• Standard cricket balls will be used</li>
                <li>• Umpires and scorers provided</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Image Carousel Section */}
      <ImageCarousel />

      {/* Call to Action */}
      <section className="py-24 scroll-fade-in relative overflow-hidden">
        <div className="absolute inset-0 gradient-shift opacity-20"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="font-righteous text-6xl text-white mb-8 text-glow">
            🚀 Ready to Play? 🚀
          </h2>
          <p className="text-2xl text-white/80 mb-12 max-w-3xl mx-auto font-poppins font-medium">
            Don't miss the biggest cricket tournament of the year!
            <span className="block mt-2 font-bold text-yellow-400">
              Register now and be part of cricket history! 🏏
            </span>
          </p>
          <Link href="/register">
            <Button size="xl" className="bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 text-white hover:from-orange-600 hover:via-red-600 hover:to-pink-600 font-bold px-16 py-8 h-auto text-2xl rounded-3xl transition-all duration-300 hover:scale-110 hover-glow shadow-2xl tilt-hover">
              ⚡ Register Before Deadline ⚡
            </Button>
          </Link>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400/20 rounded-full morph-bg"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-blue-500/20 rounded-full morph-bg" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-green-400/20 rounded-full morph-bg" style={{animationDelay: '4s'}}></div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="flex items-center justify-center space-x-4 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-full flex items-center justify-center tilt-hover">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="font-orbitron text-2xl font-bold text-white text-glow">
              Dolphin Club Cricket Championship 2025
            </span>
          </div>
          <p className="text-white/60 mb-4 font-poppins text-lg">🏏 Organized by CSL Sports Committee 🏏</p>
          <p className="text-sm text-white/40 font-poppins">© 2025 CSL. All rights reserved. Made with ❤️ for cricket lovers!</p>
          
          {/* Fun cricket emojis */}
          <div className="flex justify-center space-x-4 mt-8 text-2xl">
            <span className="animate-bounce" style={{animationDelay: '0s'}}>🏏</span>
            <span className="animate-bounce" style={{animationDelay: '0.2s'}}>🏆</span>
            <span className="animate-bounce" style={{animationDelay: '0.4s'}}>⚡</span>
            <span className="animate-bounce" style={{animationDelay: '0.6s'}}>🎯</span>
            <span className="animate-bounce" style={{animationDelay: '0.8s'}}>🏟️</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
