/** Structured “What We Offer” blocks — drives /services and admin overview. */
export type ServiceOffering = {
  id: string
  title: string
  description: string
  highlights: string[]
  featured?: boolean
}

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    id: 'sessions-training',
    title: 'Sessions / Training & Sessions',
    description: 'Structured workshops and hands-on training across security and AI tools.',
    highlights: [
      'Cyber Security',
      'C&H Training',
      'Cyber Security Basics',
      'Cyber Security Tools',
      'CPENT',
      'AI Tools',
    ],
  },
  {
    id: 'ai',
    title: 'AI (ML, Deep Learning, LLMs, Agentic AI)',
    description: 'Full-spectrum Artificial Intelligence—from classical ML to agentic systems.',
    highlights: [
      'Machine Learning',
      'Deep Learning',
      'Large Language Models (LLMs)',
      'Agentic AI',
      'Model fine-tuning & deployment',
      'AI strategy & integration',
    ],
  },
  {
    id: 'ai-web',
    title: 'AI & Web Solutions',
    description: 'Research-based products with AI and Security at the core.',
    highlights: [
      'AI-powered web applications',
      'Security-integrated solutions',
      'Research-to-product development',
      'Custom dashboards & APIs',
      'Enterprise web platforms',
      'Compliance & audit-ready systems',
    ],
  },
  {
    id: 'cloud',
    title: 'Cloud Infrastructure',
    description: 'Scalable, secure cloud planning and deployment for any workload.',
    highlights: [
      'Cloud architecture & design',
      'Scalable deployment (AWS, Azure, GCP)',
      'Security hardening & compliance',
      'CI/CD pipelines',
      'Monitoring & observability',
      'Cost optimization & governance',
    ],
  },
  {
    id: 'product-engineering',
    title: 'Product Engineering',
    description: 'End-to-end engineering of robust, production-ready products.',
    featured: true,
    highlights: [
      'Requirements & discovery',
      'System design & architecture',
      'Development & testing',
      'DevOps & deployment',
      'Performance & scalability',
      'Maintenance & support',
    ],
  },
]
