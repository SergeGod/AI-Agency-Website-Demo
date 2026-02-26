'use client'

import { motion } from 'framer-motion'
import { Calendar } from 'lucide-react'

interface BookingProps {
  calendlyUrl: string
}

export default function Booking({ calendlyUrl }: BookingProps) {
  return (
    <section id="booking" className="section-padding relative">
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-violet-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm font-medium mb-6"
          >
            <Calendar className="w-3.5 h-3.5" />
            Free 30-minute strategy call
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            Book a time that{' '}
            <span className="gradient-text">works for you</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-lg mx-auto"
          >
            No pressure. We'll listen to your challenges and map out the
            highest-impact AI opportunities for your specific business.
          </motion.p>
        </div>

        {/* Calendly embed */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-white/[0.08] bg-white/[0.03] overflow-hidden"
          style={{ minHeight: '660px' }}
        >
          <iframe
            src={`${calendlyUrl}?embed_domain=${typeof window !== 'undefined' ? window.location.hostname : 'localhost'}&embed_type=Inline&hide_gdpr_banner=1&background_color=09090b&text_color=fafafa&primary_color=6366f1`}
            width="100%"
            height="660"
            frameBorder="0"
            title="Schedule a call"
            className="w-full"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  )
}
