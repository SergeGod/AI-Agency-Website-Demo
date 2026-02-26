'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { Check, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: '$4,900',
    period: 'one-time',
    description: 'Perfect for validating your first AI use case with a focused, high-impact automation.',
    features: [
      'Single AI automation build',
      'Up to 2 integrations',
      'Basic RAG or chatbot',
      '30-day support & fixes',
      'Documentation included',
      'Deployment on your infra',
    ],
    cta: 'Get started',
    popular: false,
    gradient: false,
  },
  {
    name: 'Growth',
    price: '$12,900',
    period: 'project',
    description: 'Full AI system build — agents, automation pipelines, and dashboards — for scaling teams.',
    features: [
      'Everything in Starter',
      'Full AI agent development',
      'Up to 8 integrations',
      'Custom dashboard & reporting',
      '60-day priority support',
      'Training & handover session',
      'Architecture documentation',
      'Performance monitoring',
    ],
    cta: 'Book a call',
    popular: true,
    gradient: true,
  },
  {
    name: 'Scale',
    price: 'Custom',
    period: 'retainer',
    description: 'Ongoing AI development partner for enterprises and fast-scaling startups.',
    features: [
      'Everything in Growth',
      'Dedicated AI engineer',
      'Unlimited integrations',
      'Monthly strategy sessions',
      'Proactive AI opportunity audits',
      'SLA with guaranteed uptime',
      'White-glove onboarding',
      'Custom contracts & NDAs',
    ],
    cta: 'Contact us',
    popular: false,
    gradient: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="section-padding relative">
      {/* Background glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-violet-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-indigo-400 tracking-widest uppercase mb-4"
          >
            Pricing
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            Transparent pricing,{' '}
            <span className="gradient-text">real value</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-xl mx-auto"
          >
            No hidden fees. No long-term lock-ins. Just results.
          </motion.p>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`relative rounded-2xl p-7 flex flex-col ${
                plan.popular
                  ? 'border border-indigo-500/40 bg-gradient-to-b from-indigo-500/10 to-violet-500/5 shadow-xl shadow-indigo-500/10'
                  : 'border border-white/[0.08] bg-white/[0.03]'
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-semibold shadow-lg shadow-indigo-500/30">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-white font-semibold text-lg mb-1">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1.5 mb-3">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-zinc-500 text-sm">/ {plan.period}</span>
                </div>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/[0.08] mb-6" />

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div
                      className={`mt-0.5 w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                        plan.popular
                          ? 'bg-indigo-500/20 text-indigo-400'
                          : 'bg-white/[0.08] text-zinc-400'
                      }`}
                    >
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-sm text-zinc-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? 'default' : 'outline'}
                size="lg"
                className="w-full"
                asChild
              >
                <Link href="#contact">{plan.cta}</Link>
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Money-back note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center text-zinc-500 text-sm mt-10"
        >
          All projects include a satisfaction guarantee. Not happy? We'll make
          it right.
        </motion.p>
      </div>
    </section>
  )
}
