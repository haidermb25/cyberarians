import type { Product } from '@/lib/types/product'
import type { Session } from '@/lib/types/session'

/** Shown when the `products` table is empty or unavailable. IDs are prefixed so they never collide with UUIDs. */
export const DUMMY_PRODUCTS: Product[] = [
  {
    id: 'demo-product-research-hub',
    name: 'Cybrarian Research Hub',
    description: 'Central workspace to discover researchers, communities, and shared resources in one place.',
    icon: 'globe',
    featured: false,
    features: [
      'Unified researcher and community directory',
      'Saved lists and lightweight collaboration notes',
      'Exports and shareable profile links',
      'Activity-friendly layout for daily use',
    ],
  },
  {
    id: 'demo-product-threat-lab',
    name: 'Threat Lab Workbench',
    description: 'Hands-on environment for security exercises, labs, and guided scenarios.',
    icon: 'shield',
    featured: false,
    features: [
      'Pre-built cyber range-style lab flows',
      'Checklists aligned to common certifications',
      'Progress tracking per learner',
      'Optional facilitator-led mode',
    ],
  },
  {
    id: 'demo-product-ai-copilot',
    name: 'AI Literature Copilot',
    description: 'Assistive tooling for summarizing papers, comparing methods, and drafting literature notes.',
    icon: 'brain',
    featured: true,
    features: [
      'Structured summaries with citation placeholders',
      'Side-by-side comparison of related work',
      'Export to Markdown and simple BibTeX snippets',
      'Privacy-conscious defaults for institutional use',
      'Team spaces with shared prompt libraries',
      'Optional on-prem or VPC deployment paths',
    ],
  },
  {
    id: 'demo-product-data-sandbox',
    name: 'Secure Data Sandbox',
    description: 'Isolated project spaces for sensitive datasets with clear access boundaries.',
    icon: 'layers',
    featured: false,
    features: [
      'Role-based access patterns',
      'Audit-friendly activity markers',
      'Integration hooks for common storage backends',
    ],
  },
  {
    id: 'demo-product-api-gateway',
    name: 'Community API Gateway',
    description: 'Stable APIs for embedding community and researcher data into your own sites and tools.',
    icon: 'cloud',
    featured: false,
    features: [
      'Read-focused endpoints with rate limits',
      'Webhook-style notifications (roadmap)',
      'Sandbox keys for development',
    ],
  },
]

/** Shown when the `sessions` table is empty or unavailable. Uses dates relative to “now” on each request. */
export function getDummySessions(): Session[] {
  const now = new Date()

  const at = (dayOffset: number, hour: number, minute = 0) => {
    const d = new Date(now)
    d.setDate(d.getDate() + dayOffset)
    d.setHours(hour, minute, 0, 0)
    return d.toISOString()
  }

  const startLive = new Date(now)
  startLive.setMinutes(startLive.getMinutes() - 45)
  const endLive = new Date(now)
  endLive.setHours(endLive.getHours() + 1)

  return [
    {
      id: 'demo-session-cpent',
      name: 'CPENT Study Lab — Week 3',
      description: 'Guided practice block focused on enumeration, pivoting, and reporting. Bring your notes.',
      startsAt: at(1, 10, 0),
      endsAt: at(1, 12, 30),
      working: false,
      location: 'Online · Zoom',
      format: 'online',
      facilitator: 'Dr. Anwar Shah',
      maxParticipants: 24,
      sessionType: 'Training',
    },
    {
      id: 'demo-session-office-hours',
      name: 'Research Office Hours (Live)',
      description: 'Open Q&A for early-career researchers on grants, collaborations, and tooling.',
      startsAt: startLive.toISOString(),
      endsAt: endLive.toISOString(),
      working: true,
      location: 'Cybrarian Live Room',
      format: 'online',
      facilitator: 'Community team',
      maxParticipants: 40,
      sessionType: 'Office hours',
    },
    {
      id: 'demo-session-ai-tools',
      name: 'AI Tools for Literature Review',
      description: 'Walkthrough of practical workflows: chunking, evaluation, and human-in-the-loop review.',
      startsAt: at(3, 15, 0),
      endsAt: at(3, 17, 0),
      working: false,
      location: 'Hybrid · Berlin + Stream',
      format: 'hybrid',
      facilitator: 'Faculty guest',
      maxParticipants: 60,
      sessionType: 'Workshop',
    },
    {
      id: 'demo-session-security-basics',
      name: 'Cyber Security Basics Bootcamp',
      description: 'Foundational session covering threat models, identity, and secure defaults for teams.',
      startsAt: at(5, 9, 0),
      endsAt: at(5, 13, 0),
      working: false,
      location: 'Training center · Room B',
      format: 'in_person',
      facilitator: 'Security lead',
      maxParticipants: 18,
      sessionType: 'Bootcamp',
    },
    {
      id: 'demo-session-community',
      name: 'Community Showcase & Networking',
      description: 'Short project demos from member communities, then open networking in breakout rooms.',
      startsAt: at(7, 18, 0),
      endsAt: at(7, 20, 0),
      working: false,
      location: 'Online',
      format: 'online',
      facilitator: 'Hosts rotate',
      maxParticipants: 120,
      sessionType: 'Event',
    },
  ]
}
