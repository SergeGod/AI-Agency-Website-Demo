import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServiceClient } from '@/lib/supabase/server'

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name too long')
    .trim(),
  email: z.string().email('Invalid email address').trim().toLowerCase(),
  business_type: z.string().min(1, 'Business type is required').trim(),
  message: z
    .string()
    .min(20, 'Message must be at least 20 characters')
    .max(5000, 'Message too long')
    .trim(),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Server-side validation
    const result = contactSchema.safeParse(body)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      return NextResponse.json(
        { error: 'Validation failed', errors },
        { status: 400 }
      )
    }

    const { name, email, business_type, message } = result.data

    // Save to Supabase using service role (bypasses RLS)
    const supabase = await createServiceClient()
    const { error: dbError } = await supabase.from('leads').insert({
      name,
      email,
      business_type,
      message,
    })

    if (dbError) {
      console.error('Supabase insert error:', dbError)
      return NextResponse.json(
        { error: 'Failed to save your submission. Please try again.' },
        { status: 500 }
      )
    }

    // Send email notification via Resend (non-blocking)
    const resendApiKey = process.env.RESEND_API_KEY
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev'
    const notificationEmail = process.env.NOTIFICATION_EMAIL

    if (resendApiKey && notificationEmail) {
      try {
        const { Resend } = await import('resend')
        const resend = new Resend(resendApiKey)

        await resend.emails.send({
          from: `NexusAI Leads <${fromEmail}>`,
          to: [notificationEmail],
          subject: `New lead: ${name} (${business_type})`,
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #0f0f0f; color: #fafafa; padding: 32px; border-radius: 12px;">
              <h2 style="color: #6366f1; margin: 0 0 24px;">New Strategy Call Request</h2>

              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1f1f1f; color: #a1a1aa; width: 140px;">Name</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1f1f1f; font-weight: 600;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1f1f1f; color: #a1a1aa;">Email</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1f1f1f;"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1f1f1f; color: #a1a1aa;">Business Type</td>
                  <td style="padding: 12px 0; border-bottom: 1px solid #1f1f1f;">${business_type}</td>
                </tr>
                <tr>
                  <td style="padding: 12px 0; color: #a1a1aa; vertical-align: top;">Message</td>
                  <td style="padding: 12px 0; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>

              <div style="margin-top: 24px; padding: 16px; background: #1a1a2e; border-radius: 8px; border-left: 3px solid #6366f1;">
                <p style="margin: 0; color: #a1a1aa; font-size: 14px;">
                  Submitted at ${new Date().toLocaleString('en-US', { timeZone: 'UTC' })} UTC
                </p>
              </div>
            </div>
          `,
        })
      } catch (emailErr) {
        // Email failure shouldn't break the submission
        console.error('Email send error:', emailErr)
      }
    }

    return NextResponse.json(
      { success: true, message: 'Your message has been received!' },
      { status: 201 }
    )
  } catch (err) {
    console.error('Contact route error:', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
