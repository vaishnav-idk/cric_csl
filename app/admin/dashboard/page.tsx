'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { getAllPlayers, getPlayerStats, searchPlayers } from '@/app/actions'
import { formatDateTime } from '@/lib/utils'
import { 
  Trophy, 
  Users, 
  Target, 
  Shield, 
  Search, 
  Download, 
  FileText, 
  FileSpreadsheet,
  LogOut,
  Filter,
  Eye
} from 'lucide-react'
import type { Player } from '@/lib/database'

interface PlayerStats {
  total: number
  batsmen: number
  bowlers: number
  allRounders: number
  wicketKeepers: number
}

export default function AdminDashboard() {
  const [players, setPlayers] = useState<Player[]>([])
  const [stats, setStats] = useState<PlayerStats>({
    total: 0,
    batsmen: 0,
    bowlers: 0,
    allRounders: 0,
    wicketKeepers: 0
  })
  const [searchQuery, setSearchQuery] = useState('')
  const [filterType, setFilterType] = useState<string>('all')
  const [isLoading, setIsLoading] = useState(true)
  const [filteredPlayers, setFilteredPlayers] = useState<Player[]>([])
  const [isClient, setIsClient] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
    // Check authentication
    const authStatus = localStorage.getItem('adminAuthenticated')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      loadData()
    } else {
      router.push('/admin')
    }
  }, [])

  useEffect(() => {
    filterPlayers()
  }, [players, searchQuery, filterType])

  const loadData = async () => {
    setIsLoading(true)
    try {
      const [playersData, statsData] = await Promise.all([
        getAllPlayers(),
        getPlayerStats()
      ])
      setPlayers(playersData)
      setStats(statsData)
    } catch (error) {
      console.error('Error loading data:', error)
    }
    setIsLoading(false)
  }

  const filterPlayers = () => {
    let filtered = players

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(player => 
        player.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.employee_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        player.phone.includes(searchQuery)
      )
    }

    // Apply type filter
    if (filterType !== 'all') {
      if (filterType === 'wicket-keeper') {
        filtered = filtered.filter(player => player.wicket_keeper)
      } else {
        filtered = filtered.filter(player => player.player_type === filterType)
      }
    }

    setFilteredPlayers(filtered)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminAuthenticated')
    router.push('/admin')
  }

  const exportToCSV = () => {
    const headers = ['Employee Code', 'Full Name', 'Email', 'Phone', 'Player Type', 'Batting Hand', 'Bowling Hand', 'Wicket Keeper', 'Registration Date']
    const csvData = filteredPlayers.map(player => [
      player.employee_code,
      player.full_name,
      player.email || '',
      player.phone,
      player.player_type,
      player.batting_hand,
      player.bowling_hand || '',
      player.wicket_keeper ? 'Yes' : 'No',
      player.created_at ? new Date(player.created_at).toLocaleDateString() : ''
    ])

    const csvContent = [headers, ...csvData]
      .map(row => row.map(field => `"${field}"`).join(','))
      .join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `cricket_registrations_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    window.URL.revokeObjectURL(url)
  }

  const exportToPDF = async () => {
    try {
      // Dynamic import to avoid SSR issues
      const { jsPDF } = await import('jspdf')
      const autoTable = (await import('jspdf-autotable')).default

      const doc = new jsPDF()
      
      // Title
      doc.setFontSize(20)
      doc.text('Cricket Championship 2025 - Registrations', 14, 22)
      
      // Stats summary
      doc.setFontSize(12)
      doc.text(`Total Registrations: ${stats.total}`, 14, 35)
      doc.text(`Batsmen: ${stats.batsmen} | Bowlers: ${stats.bowlers} | All-Rounders: ${stats.allRounders} | Wicket Keepers: ${stats.wicketKeepers}`, 14, 42)
      
      // Table
      const tableData = filteredPlayers.map(player => [
        player.employee_code,
        player.full_name,
        player.phone,
        player.player_type,
        player.batting_hand,
        player.wicket_keeper ? 'Yes' : 'No'
      ])

      autoTable(doc, {
        head: [['Employee Code', 'Name', 'Phone', 'Type', 'Batting', 'WK']],
        body: tableData,
        startY: 50,
        styles: { fontSize: 8 },
        headStyles: { fillColor: [67, 56, 202] }
      })

      doc.save(`cricket_registrations_${new Date().toISOString().split('T')[0]}.pdf`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
      alert('Error exporting PDF. Please try again.')
    }
  }

  if (!isClient || isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center space-x-3">
          <Trophy className="w-8 h-8 text-orange-500" />
          <div>
            <h1 className="text-3xl font-bold text-white">Tournament Dashboard</h1>
            <p className="text-blue-200">Cricket Championship 2025 - Admin Panel</p>
          </div>
        </div>
        <div className="flex space-x-4">
          <Link href="/">
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              View Site
            </Button>
          </Link>
          <Button variant="destructive" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
        <div className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform">
          <Users className="w-12 h-12 text-blue-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white">{stats.total}</div>
          <div className="text-blue-200">Total Players</div>
        </div>
        <div className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform">
          <Target className="w-12 h-12 text-green-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white">{stats.batsmen}</div>
          <div className="text-blue-200">Batsmen</div>
        </div>
        <div className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform">
          <Target className="w-12 h-12 text-red-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white">{stats.bowlers}</div>
          <div className="text-blue-200">Bowlers</div>
        </div>
        <div className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform">
          <Target className="w-12 h-12 text-purple-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white">{stats.allRounders}</div>
          <div className="text-blue-200">All-Rounders</div>
        </div>
        <div className="glass-effect p-6 rounded-lg text-center hover:scale-105 transition-transform">
          <Shield className="w-12 h-12 text-yellow-400 mx-auto mb-3" />
          <div className="text-3xl font-bold text-white">{stats.wicketKeepers}</div>
          <div className="text-blue-200">Wicket Keepers</div>
        </div>
      </div>

      {/* Controls */}
      <div className="glass-effect p-6 rounded-lg mb-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search by name, employee code, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-slate-800 border-slate-600 text-white"
              />
            </div>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 bg-slate-800 border border-slate-600 rounded-md text-white"
            >
              <option value="all">All Players</option>
              <option value="Batsman">Batsmen</option>
              <option value="Bowler">Bowlers</option>
              <option value="All-Rounder">All-Rounders</option>
              <option value="wicket-keeper">Wicket Keepers</option>
            </select>
          </div>
          <div className="flex gap-2">
            <Button onClick={exportToCSV} variant="outline" size="sm">
              <FileSpreadsheet className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
            <Button onClick={exportToPDF} variant="outline" size="sm">
              <FileText className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>
        <div className="mt-4 text-sm text-blue-200">
          Showing {filteredPlayers.length} of {stats.total} registrations
        </div>
      </div>

      {/* Players Table */}
      <div className="glass-effect rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-800">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Employee Code</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Contact</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Player Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Batting</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Bowling</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">WK</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-white">Registered</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {filteredPlayers.map((player) => (
                <tr key={player.id} className="hover:bg-slate-800/50 transition-colors">
                  <td className="px-6 py-4 text-sm text-white font-mono">{player.employee_code}</td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-sm font-medium text-white">{player.full_name}</div>
                      {player.email && (
                        <div className="text-sm text-gray-400">{player.email}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{player.phone}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      player.player_type === 'Batsman' ? 'bg-green-900 text-green-300' :
                      player.player_type === 'Bowler' ? 'bg-red-900 text-red-300' :
                      'bg-purple-900 text-purple-300'
                    }`}>
                      {player.player_type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-white">{player.batting_hand}</td>
                  <td className="px-6 py-4 text-sm text-white">{player.bowling_hand || '-'}</td>
                  <td className="px-6 py-4">
                    {player.wicket_keeper ? (
                      <span className="inline-flex px-2 py-1 text-xs font-medium rounded-full bg-yellow-900 text-yellow-300">
                        Yes
                      </span>
                    ) : (
                      <span className="text-gray-400">No</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {player.created_at ? formatDateTime(player.created_at) : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No players found</p>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </div>
  )
}
