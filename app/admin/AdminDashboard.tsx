'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import {
  Zap,
  LogOut,
  Users,
  Mail,
  Calendar,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  RefreshCw,
} from 'lucide-react'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface Lead {
  id: string
  name: string
  email: string
  business_type: string
  message: string
  created_at: string
}

interface Props {
  user: { email: string }
  leads: Lead[]
  fetchError?: string
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function LeadRow({ lead }: { lead: Lead }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <>
      <tr
        className="border-b border-white/[0.06] hover:bg-white/[0.03] transition-colors cursor-pointer"
        onClick={() => setExpanded(!expanded)}
      >
        <td className="px-6 py-4">
          <div className="font-medium text-white text-sm">{lead.name}</div>
        </td>
        <td className="px-6 py-4">
          <a
            href={`mailto:${lead.email}`}
            onClick={(e) => e.stopPropagation()}
            className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            {lead.email}
          </a>
        </td>
        <td className="px-6 py-4">
          <Badge variant="secondary" className="text-xs whitespace-nowrap">
            {lead.business_type}
          </Badge>
        </td>
        <td className="px-6 py-4">
          <span className="text-sm text-zinc-400 whitespace-nowrap">
            {formatDate(lead.created_at)}
          </span>
        </td>
        <td className="px-6 py-4 text-zinc-500">
          {expanded ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </td>
      </tr>
      {expanded && (
        <tr className="border-b border-white/[0.06] bg-white/[0.02]">
          <td colSpan={5} className="px-6 py-4">
            <div className="max-w-2xl">
              <p className="text-xs text-zinc-500 mb-1.5 uppercase tracking-wider font-medium">
                Message
              </p>
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">
                {lead.message}
              </p>
            </div>
          </td>
        </tr>
      )}
    </>
  )
}

export default function AdminDashboard({ user, leads, fetchError }: Props) {
  const router = useRouter()
  const [loggingOut, setLoggingOut] = useState(false)

  const handleLogout = async () => {
    setLoggingOut(true)
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/admin/login')
    router.refresh()
  }

  const totalLeads = leads.length
  const recentLeads = leads.filter((l) => {
    const diff = Date.now() - new Date(l.created_at).getTime()
    return diff < 7 * 24 * 60 * 60 * 1000 // last 7 days
  }).length

  const uniqueBusinessTypes = Array.from(new Set(leads.map((l) => l.business_type))).length

  return (
    <div className="min-h-screen bg-[#09090b] text-white">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.06] bg-[#09090b]/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-white">NexusAI</span>
                <span className="text-zinc-500 text-sm ml-2">Admin</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-zinc-500 hidden sm:block">
                {user.email}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                disabled={loggingOut}
                className="text-zinc-400"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {loggingOut ? 'Signing out...' : 'Sign out'}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Leads Dashboard</h1>
          <p className="text-zinc-400 text-sm mt-1">
            All strategy call requests and contact form submissions
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {[
            {
              icon: Users,
              label: 'Total Leads',
              value: totalLeads,
              color: 'indigo',
            },
            {
              icon: Calendar,
              label: 'Last 7 Days',
              value: recentLeads,
              color: 'violet',
            },
            {
              icon: Mail,
              label: 'Industries',
              value: uniqueBusinessTypes,
              color: 'blue',
            },
          ].map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-5"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
                  <stat.icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <p className="text-xs text-zinc-500">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Error state */}
        {fetchError && (
          <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 mb-6">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <div>
              <p className="text-sm text-red-300 font-medium">
                Failed to load leads
              </p>
              <p className="text-xs text-red-400/70 mt-0.5">{fetchError}</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.refresh()}
              className="ml-auto text-red-400"
            >
              <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
              Retry
            </Button>
          </div>
        )}

        {/* Table */}
        <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden">
          {leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-12 h-12 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center mb-4">
                <Users className="w-5 h-5 text-zinc-500" />
              </div>
              <p className="text-white font-medium mb-1">No leads yet</p>
              <p className="text-zinc-500 text-sm">
                Strategy call requests will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/[0.08]">
                    {['Name', 'Email', 'Business Type', 'Date', ''].map(
                      (h) => (
                        <th
                          key={h}
                          className="px-6 py-3.5 text-left text-xs font-semibold text-zinc-500 uppercase tracking-wider"
                        >
                          {h}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <LeadRow key={lead.id} lead={lead} />
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
