'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background glow */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute left-1/3 top-1/2 -translate-y-1/2 w-[400px] h-[300px] bg-violet-600/15 blur-[80px] rounded-full pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-white/[0.08] bg-white/[0.03] p-12 md:p-16 backdrop-blur-sm relative overflow-hidden"
        >
          {/* Inner gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.05] to-transparent rounded-3xl pointer-events-none" />

          <div className="relative z-10">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-sm font-medium text-indigo-400 tracking-widest uppercase mb-6"
            >
              Ready to transform your business?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Start building your
              <br />
              <span className="gradient-text">AI advantage today</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-zinc-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed"
            >
              Book a free 30-minute strategy call. We'll map out exactly how AI
              can automate your biggest time sinks and identify the highest-ROI
              opportunities for your business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Button size="xl" asChild className="group">
                <Link href="#contact">
                  <Calendar className="mr-2 w-4 h-4" />
                  Book a Free Strategy Call
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="xl" variant="ghost" asChild>
                <Link href="mailto:hello@nexusai.com">Send us an email</Link>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="mt-8 text-zinc-600 text-sm"
            >
              No commitment required · Response within 24 hours · Free consultation
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
