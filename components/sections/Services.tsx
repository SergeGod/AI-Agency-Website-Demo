'use client'

import { motion } from 'framer-motion'
import {
  Bot,
  Workflow,
  BarChart3,
  MessageSquare,
  Search,
  Layers,
} from 'lucide-react'

const services = [
  {
    icon: Bot,
    title: 'AI Agents & Assistants',
    description:
      'Custom AI agents that handle complex tasks autonomously — from customer support to internal operations — with memory, reasoning, and tool use.',
    tags: ['GPT-4o', 'Claude', 'LangGraph'],
  },
  {
    icon: Workflow,
    title: 'Business Process Automation',
    description:
      'End-to-end automation pipelines that eliminate repetitive work. From document processing to multi-step approval flows.',
    tags: ['n8n', 'Zapier', 'Custom APIs'],
  },
  {
    icon: BarChart3,
    title: 'AI-Powered Analytics',
    description:
      'Transform raw data into actionable insights. Custom dashboards and AI-driven reporting systems that surface what matters.',
    tags: ['RAG', 'Vector DBs', 'ETL'],
  },
  {
    icon: MessageSquare,
    title: 'Conversational AI',
    description:
      'Intelligent chatbots and voice assistants trained on your business data. Omnichannel support with human-like interactions.',
    tags: ['Fine-tuning', 'Embeddings', 'Twilio'],
  },
  {
    icon: Search,
    title: 'Semantic Search & RAG',
    description:
      'Retrieval-Augmented Generation systems that let your teams query internal knowledge bases with natural language — accurately.',
    tags: ['Pinecone', 'pgvector', 'OpenAI'],
  },
  {
    icon: Layers,
    title: 'Custom LLM Integrations',
    description:
      'Seamlessly integrate AI capabilities into your existing product stack. From APIs to full-stack applications with AI at the core.',
    tags: ['Next.js', 'FastAPI', 'AWS'],
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] },
  },
}

export default function Services() {
  return (
    <section id="services" className="section-padding relative">
      {/* Subtle glow */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-sm font-medium text-indigo-400 tracking-widest uppercase mb-4"
          >
            What we do
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-4xl md:text-5xl font-bold text-white mb-5"
          >
            AI services that actually{' '}
            <span className="gradient-text">move the needle</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-zinc-400 text-lg max-w-xl mx-auto"
          >
            We don't sell AI hype. We deliver measurable results through
            custom-built systems tailored to your business.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="group relative rounded-xl border border-white/[0.08] bg-white/[0.03] p-6 hover:border-indigo-500/30 hover:bg-white/[0.06] transition-all duration-300 cursor-default overflow-hidden"
            >
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/[0.04] to-violet-500/[0.04] opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />

              <div className="relative z-10">
                {/* Icon */}
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-5 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/40 transition-all duration-300">
                  <service.icon className="w-5 h-5 text-indigo-400" />
                </div>

                <h3 className="text-white font-semibold text-lg mb-2.5">
                  {service.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-5">
                  {service.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs text-zinc-500 border border-white/[0.08] bg-white/[0.04] rounded-full px-2.5 py-1 group-hover:border-white/[0.12] transition-colors duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
