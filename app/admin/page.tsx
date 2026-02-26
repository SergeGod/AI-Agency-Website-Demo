import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminDashboard from './AdminDashboard'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const supabase = await createClient()

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    redirect('/admin/login')
  }

  // Fetch leads server-side
  const { data: leads, error: dbError } = await supabase
    .from('leads')
    .select('id, name, email, business_type, message, created_at')
    .order('created_at', { ascending: false })

  return (
    <AdminDashboard
      user={{ email: user.email! }}
      leads={leads ?? []}
      fetchError={dbError?.message}
    />
  )
}
