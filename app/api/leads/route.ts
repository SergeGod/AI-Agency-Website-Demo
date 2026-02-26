import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function GET() {
  try {
    const supabase = await createClient()

    // Verify user is authenticated
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Fetch leads ordered by newest first
    const { data: leads, error: dbError } = await supabase
      .from('leads')
      .select('id, name, email, business_type, message, created_at')
      .order('created_at', { ascending: false })

    if (dbError) {
      console.error('Supabase fetch error:', dbError)
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
    }

    return NextResponse.json({ leads })
  } catch (err) {
    console.error('Leads route error:', err)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
