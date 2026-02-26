'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, Loader2, Mail, Clock, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface FormState {
  name: string
  email: string
  business_type: string
  message: string
}

const initialForm: FormState = {
  name: '',
  email: '',
  business_type: '',
  message: '',
}

const businessTypes = [
  'SaaS / Software',
  'E-commerce',
  'Healthcare',
  'Finance / Fintech',
  'Legal',
  'Marketing Agency',
  'Manufacturing',
  'Real Estate',
  'Education',
  'Other',
]

const perks = [
  { icon: Clock, text: 'Response within 24 hours' },
  { icon: Mail, text: 'No spam, ever' },
  { icon: Shield, text: 'Your data stays private' },
]

export default function Contact() {
  const [form, setForm] = useState<FormState>(initialForm)
  const [errors, setErrors] = useState<Partial<FormState>>({})
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const validate = (): boolean => {
    const newErrors: Partial<FormState> = {}

    if (!form.name.trim() || form.name.trim().length < 2) {
      newErrors.name = 'Please enter your full name'
    }
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    if (!form.business_type) {
      newErrors.business_type = 'Please select your business type'
    }
    if (!form.message.trim() || form.message.trim().length < 20) {
      newErrors.message = 'Please describe your needs (at least 20 characters)'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Something went wrong')
      }

      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      )
    }
  }

  return (
    <section id="contact" className="section-padding relative">
      {/* Background glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — copy */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-sm font-medium text-indigo-400 tracking-widest uppercase mb-4"
            >
              Get in touch
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
            >
              Let's build something{' '}
              <span className="gradient-text">powerful together</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-400 text-lg leading-relaxed mb-10"
            >
              Tell us about your business and what you're trying to automate or
              improve. We'll review your message and get back to you within one
              business day with a tailored response.
            </motion.p>

            {/* Perks */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="space-y-4"
            >
              {perks.map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-indigo-400" />
                  </div>
                  <span className="text-zinc-400 text-sm">{text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="rounded-2xl border border-white/[0.08] bg-white/[0.03] p-8 backdrop-blur-sm relative overflow-hidden"
          >
            {/* Inner gradient top */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

            {/* Success state */}
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center text-center py-10"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Message received!
                </h3>
                <p className="text-zinc-400 text-sm max-w-xs leading-relaxed">
                  Thanks for reaching out. We'll review your request and get
                  back to you within 24 hours.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-8"
                  onClick={() => setStatus('idle')}
                >
                  Send another message
                </Button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="name">Full name *</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Jane Smith"
                    value={form.name}
                    onChange={handleChange}
                    className={errors.name ? 'border-red-500/50 focus:border-red-500/50' : ''}
                  />
                  {errors.name && (
                    <p className="text-xs text-red-400">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <Label htmlFor="email">Work email *</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="jane@company.com"
                    value={form.email}
                    onChange={handleChange}
                    className={errors.email ? 'border-red-500/50 focus:border-red-500/50' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-red-400">{errors.email}</p>
                  )}
                </div>

                {/* Business type */}
                <div className="space-y-1.5">
                  <Label htmlFor="business_type">Business type *</Label>
                  <select
                    id="business_type"
                    name="business_type"
                    value={form.business_type}
                    onChange={handleChange}
                    className={`flex h-11 w-full rounded-lg border bg-white/[0.04] px-4 py-2 text-sm text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500/50 hover:border-white/15 appearance-none cursor-pointer ${
                      errors.business_type
                        ? 'border-red-500/50'
                        : 'border-white/10'
                    }`}
                    style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
                  >
                    <option value="" disabled className="bg-zinc-900">
                      Select your industry...
                    </option>
                    {businessTypes.map((type) => (
                      <option key={type} value={type} className="bg-zinc-900">
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.business_type && (
                    <p className="text-xs text-red-400">{errors.business_type}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="message">Tell us about your needs *</Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Describe what you're trying to automate or improve, your current challenges, and any relevant context..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                    className={errors.message ? 'border-red-500/50 focus:border-red-500/50' : ''}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-400">{errors.message}</p>
                  )}
                </div>

                {/* API error */}
                {status === 'error' && errorMessage && (
                  <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3">
                    <p className="text-sm text-red-400">{errorMessage}</p>
                  </div>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full"
                  disabled={status === 'loading'}
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
