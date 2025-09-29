'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { registerPlayer, type RegistrationResult } from '@/app/actions'
import { Trophy, ArrowLeft, CheckCircle, AlertCircle, User, Phone, Mail, Target, Hand } from 'lucide-react'

export default function RegisterPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [result, setResult] = useState<RegistrationResult | null>(null)
  const [formData, setFormData] = useState({
    employeeCode: '',
    fullName: '',
    email: '',
    phone: '',
    playerType: '',
    battingHand: '',
    bowlingHand: '',
    wicketKeeper: false
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setResult(null)

    const form = new FormData(e.currentTarget)
    const registrationResult = await registerPlayer(form)
    
    setResult(registrationResult)
    setIsSubmitting(false)

    if (registrationResult.success) {
      // Reset form on success
      setFormData({
        employeeCode: '',
        fullName: '',
        email: '',
        phone: '',
        playerType: '',
        battingHand: '',
        bowlingHand: '',
        wicketKeeper: false
      })
    }
  }

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  if (result?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="glass-effect p-8 rounded-lg animate-bounce-in">
            <CheckCircle className="w-20 h-20 text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Registration Successful!</h1>
            <p className="text-blue-200 mb-6">{result.message}</p>
            <div className="space-y-4">
              <Link href="/">
                <Button variant="cricket" size="lg" className="w-full">
                  Back to Home
                </Button>
              </Link>
              <Link href="/register">
                <Button variant="outline" size="lg" className="w-full">
                  Register Another Player
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8">
      {/* Navigation */}
      <nav className="container mx-auto px-4 mb-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 text-white hover:text-blue-300 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          <div className="flex items-center space-x-2">
            <Trophy className="w-8 h-8 text-orange-500" />
            <span className="text-xl font-bold text-white">Tournament Registration</span>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 max-w-2xl">
        <div className="glass-effect p-8 rounded-lg animate-fade-in">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              Register for Cricket Championship 2025
            </h1>
            <p className="text-blue-200">
              Fill in your details to join the most exciting cricket tournament of the year!
            </p>
          </div>

          {result && !result.success && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-500 rounded-lg flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-red-300 font-medium">{result.message}</p>
                {result.errors && (
                  <ul className="mt-2 text-sm text-red-400">
                    {Object.entries(result.errors).map(([field, error]) => (
                      <li key={field}>• {error}</li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Employee Code */}
            <div className="space-y-2">
              <Label htmlFor="employeeCode" className="text-white flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Employee Code *</span>
              </Label>
              <Input
                id="employeeCode"
                name="employeeCode"
                type="text"
                placeholder="Enter your CSL employee code"
                value={formData.employeeCode}
                onChange={(e) => handleInputChange('employeeCode', e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                required
              />
              <p className="text-sm text-slate-400">Your unique CSL employee identifier (4-10 characters)</p>
            </div>

            {/* Full Name */}
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-white flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>Full Name *</span>
              </Label>
              <Input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={(e) => handleInputChange('fullName', e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-white flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Email (Optional)</span>
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-white flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Phone Number *</span>
              </Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                placeholder="Enter your 10-digit phone number"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                required
              />
            </div>

            {/* Player Type */}
            <div className="space-y-2">
              <Label htmlFor="playerType" className="text-white flex items-center space-x-2">
                <Target className="w-4 h-4" />
                <span>Player Type *</span>
              </Label>
              <Select
                name="playerType"
                value={formData.playerType}
                onValueChange={(value) => handleInputChange('playerType', value)}
                required
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Select your playing style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Batsman">Batsman</SelectItem>
                  <SelectItem value="Bowler">Bowler</SelectItem>
                  <SelectItem value="All-Rounder">All-Rounder</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Batting Hand */}
            <div className="space-y-2">
              <Label htmlFor="battingHand" className="text-white flex items-center space-x-2">
                <Hand className="w-4 h-4" />
                <span>Batting Hand *</span>
              </Label>
              <Select
                name="battingHand"
                value={formData.battingHand}
                onValueChange={(value) => handleInputChange('battingHand', value)}
                required
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Select batting handedness" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Right">Right Handed</SelectItem>
                  <SelectItem value="Left">Left Handed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Bowling Hand (only for All-Rounders) */}
            {formData.playerType === 'All-Rounder' && (
              <div className="space-y-2">
                <Label htmlFor="bowlingHand" className="text-white flex items-center space-x-2">
                  <Hand className="w-4 h-4" />
                  <span>Bowling Hand *</span>
                </Label>
                <Select
                  name="bowlingHand"
                  value={formData.bowlingHand}
                  onValueChange={(value) => handleInputChange('bowlingHand', value)}
                  required
                >
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder="Select bowling handedness" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Right">Right Handed</SelectItem>
                    <SelectItem value="Left">Left Handed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Wicket Keeper */}
            <div className="flex items-center space-x-3">
              <input
                id="wicketKeeper"
                name="wicketKeeper"
                type="checkbox"
                checked={formData.wicketKeeper}
                onChange={(e) => handleInputChange('wicketKeeper', e.target.checked)}
                className="w-4 h-4 text-blue-600 bg-slate-800 border-slate-600 rounded focus:ring-blue-500"
                value="true"
              />
              <Label htmlFor="wicketKeeper" className="text-white">
                I can play as a Wicket Keeper
              </Label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="cricket"
              size="lg"
              className="w-full font-bold text-lg"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Registering...
                </>
              ) : (
                'Complete Registration'
              )}
            </Button>
          </form>

          <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500 rounded-lg">
            <h3 className="text-lg font-semibold text-blue-300 mb-2">Important Notes:</h3>
            <ul className="text-sm text-blue-200 space-y-1">
              <li>• Each employee can only register once</li>
              <li>• Registration deadline: December 10, 2025</li>
              <li>• Teams will be formed by organizers for balanced gameplay</li>
              <li>• All registered players will be notified about team assignments</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
