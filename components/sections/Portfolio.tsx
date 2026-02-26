'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

const projects = [
  {
    category: 'AI Automation',
    title: 'LegalTech Document Intelligence',
    description:
      'Built a RAG-powered document review system for a law firm. Processes 10,000+ contracts monthly, reducing review time by 85% and surfacing risk clauses automatically.',
    metrics: [
      { value: '85%', label: 'Time reduction' },
      { value: '10k+', label: 'Docs/month' },
      { value: '$2.1M', label: 'Cost savings/yr' },
    ],
    tags: ['RAG', 'GPT-4', 'pgvector'],
    gradient: 'from-indigo-600/20 to-blue-600/20',
    accent: 'indigo',
  },
  {
    category: 'AI Agent',
    title: 'E-commerce Growth Agent',
    description:
      'Autonomous AI agent that monitors inventory, adjusts pricing, responds to customer inquiries, and generates daily performance reports — 24/7 without human intervention.',
    metrics: [
      { value: '3.4x', label: 'Revenue growth' },
      { value: '94%', label: 'CSAT score' },
      { value: '40h', label: 'Saved/week' },
    ],
    tags: ['LangGraph', 'Shopify API', 'Claude'],
    gradient: 'from-violet-600/20 to-purple-600/20',
    accent: 'violet',
  },
  {
    category: 'Data Pipeline',
    title: 'Healthcare Analytics Platform',
    description:
      'HIPAA-compliant AI analytics platform for a hospital network. Aggregates patient data, predicts readmission risk, and generates executive dashboards in real-time.',
    metrics: [
      { value: '31%', label: 'Readmission reduction' },
      { value: '200ms', label: 'Query latency' },
      { value: '50+', label: 'Data sources' },
    ],
    tags: ['Python', 'FastAPI', 'AWS'],
    gradient: 'from-blue-600/20 to-cyan-600/20',
    accent: 'blue',
  },
  {
    category: 'Chatbot',
    title: 'SaaS Customer Support AI',
    description:
      'Replaced 80% of tier-1 support tickets with a context-aware AI assistant trained on documentation, past tickets, and product data. Integrates with Intercom.',
    metrics: [
      { value: '80%', label: 'Ticket deflection' },
      { value: '< 2s', label: 'Response time' },
      { value: '4.8/5', label: 'User rating' },
    ],
    tags: ['Fine-tuning', 'Embeddings', 'Intercom'],
    gradient: 'from-emerald-600/20 to-teal-600/20',
    accent: 'emerald',
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" className="section-padding relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-medium text-indigo-400 tracking-widest uppercase mb-4"
          >
            Case Studies
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            Results that speak{' '}
            <span className="gradient-text">for themselves</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-xl mx-auto"
          >
            Real projects. Real impact. We measure success in business
            outcomes, not lines of code.
          </motion.p>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.03] p-7 hover:border-white/[0.14] hover:bg-white/[0.05] transition-all duration-300 overflow-hidden cursor-pointer"
            >
              {/* Background gradient */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl`}
              />

              <div className="relative z-10">
                {/* Category + arrow */}
                <div className="flex items-center justify-between mb-5">
                  <Badge variant="secondary" className="text-xs">
                    {project.category}
                  </Badge>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 group-hover:border-white/20 group-hover:text-white transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <h3 className="text-xl font-semibold text-white mb-3">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 mb-6 p-4 rounded-xl bg-white/[0.04] border border-white/[0.06]">
                  {project.metrics.map((metric) => (
                    <div key={metric.label} className="text-center">
                      <div className="text-xl font-bold gradient-text-primary">
                        {metric.value}
                      </div>
                      <div className="text-xs text-zinc-500 mt-0.5">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-zinc-500 border border-white/[0.08] bg-white/[0.04] rounded-full px-2.5 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
