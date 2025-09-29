'use server'

import { playerOperations, adminOperations, type Player } from '@/lib/database'
import { validateEmployeeCode, validatePhone, validateEmail } from '@/lib/utils'
import { redirect } from 'next/navigation'

export interface RegistrationFormData {
  employeeCode: string
  fullName: string
  email?: string
  phone: string
  playerType: 'Batsman' | 'Bowler' | 'All-Rounder'
  battingHand: 'Left' | 'Right'
  bowlingHand?: 'Left' | 'Right'
  wicketKeeper: boolean
}

export interface RegistrationResult {
  success: boolean
  message: string
  errors?: Record<string, string>
}

export async function registerPlayer(formData: FormData): Promise<RegistrationResult> {
  try {
    // Extract form data
    const employeeCode = formData.get('employeeCode') as string
    const fullName = formData.get('fullName') as string
    const email = formData.get('email') as string
    const phone = formData.get('phone') as string
    const playerType = formData.get('playerType') as 'Batsman' | 'Bowler' | 'All-Rounder'
    const battingHand = formData.get('battingHand') as 'Left' | 'Right'
    const bowlingHand = formData.get('bowlingHand') as 'Left' | 'Right' | null
    const wicketKeeper = formData.get('wicketKeeper') === 'true'

    // Validation
    const errors: Record<string, string> = {}

    if (!employeeCode || !validateEmployeeCode(employeeCode)) {
      errors.employeeCode = 'Employee code must be 4-10 alphanumeric characters'
    }

    if (!fullName || fullName.trim().length < 2) {
      errors.fullName = 'Full name must be at least 2 characters'
    }

    if (email && !validateEmail(email)) {
      errors.email = 'Please enter a valid email address'
    }

    if (!phone || !validatePhone(phone)) {
      errors.phone = 'Please enter a valid 10-digit phone number'
    }

    if (!playerType || !['Batsman', 'Bowler', 'All-Rounder'].includes(playerType)) {
      errors.playerType = 'Please select a valid player type'
    }

    if (!battingHand || !['Left', 'Right'].includes(battingHand)) {
      errors.battingHand = 'Please select batting handedness'
    }

    if (playerType === 'All-Rounder' && (!bowlingHand || !['Left', 'Right'].includes(bowlingHand))) {
      errors.bowlingHand = 'Bowling handedness is required for All-Rounders'
    }

    if (Object.keys(errors).length > 0) {
      return {
        success: false,
        message: 'Please fix the validation errors',
        errors
      }
    }

    // Check for duplicate employee code
    const existingPlayer = playerOperations.getByEmployeeCode(employeeCode)
    if (existingPlayer) {
      return {
        success: false,
        message: 'This employee code is already registered. Each employee can only register once.',
        errors: { employeeCode: 'Employee code already exists' }
      }
    }

    // Create player object
    const player: Omit<Player, 'id' | 'created_at' | 'updated_at'> = {
      employee_code: employeeCode,
      full_name: fullName.trim(),
      email: email?.trim() || undefined,
      phone: phone.replace(/\s+/g, ''),
      player_type: playerType,
      batting_hand: battingHand,
      bowling_hand: playerType === 'All-Rounder' ? bowlingHand : undefined,
      wicket_keeper: wicketKeeper
    }

    // Insert into database
    const result = playerOperations.insert(player)

    if (result.changes > 0) {
      return {
        success: true,
        message: 'Registration successful! You have been registered for the Dolphin Club Cricket Championship 2025.'
      }
    } else {
      return {
        success: false,
        message: 'Registration failed. Please try again.'
      }
    }

  } catch (error) {
    console.error('Registration error:', error)
    return {
      success: false,
      message: 'An unexpected error occurred. Please try again later.'
    }
  }
}

export async function loginAdmin(formData: FormData) {
  try {
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    if (!username || !password) {
      return {
        success: false,
        message: 'Username and password are required'
      }
    }

    const admin = adminOperations.verify(username, password)
    
    if (admin) {
      // In a real app, you'd set a secure session here
      redirect('/admin/dashboard')
    } else {
      return {
        success: false,
        message: 'Invalid username or password'
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      message: 'An error occurred during login'
    }
  }
}

export async function getPlayerStats() {
  try {
    return playerOperations.getStats()
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      total: 0,
      batsmen: 0,
      bowlers: 0,
      allRounders: 0,
      wicketKeepers: 0
    }
  }
}

export async function getAllPlayers() {
  try {
    return playerOperations.getAll()
  } catch (error) {
    console.error('Error fetching players:', error)
    return []
  }
}

export async function searchPlayers(query: string) {
  try {
    if (!query.trim()) {
      return playerOperations.getAll()
    }
    return playerOperations.search(query.trim())
  } catch (error) {
    console.error('Error searching players:', error)
    return []
  }
}
