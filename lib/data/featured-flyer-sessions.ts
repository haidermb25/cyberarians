/** Featured session cards — content from FAST Society of Cybersecurity flyers */

export type SeminarFlyerSession = {
  kind: 'seminar'
  id: string
  title: string
  topics: string[]
  speakerName: string
  sessionDate: string
  venue: string
  time: string
  description: string
  category: string
  membersCount?: number
}

export type CehFlyerSession = {
  kind: 'ceh'
  id: string
  title: string
  sessionNo: string
  trackTitle: string
  learnLabel: string
  learnItems: string[]
  scheduleDay: string
  scheduleTime: string
  venue: string
  contact: string
  deliveredBy: string
  description: string
  category: string
  membersCount?: number
}

export type FeaturedFlyerSession = SeminarFlyerSession | CehFlyerSession

export const FEATURED_FLYER_SESSIONS: FeaturedFlyerSession[] = [
  {
    kind: 'seminar',
    id: 'flyer-xss-ai',
    title: 'XSS USING AI',
    topics: [
      'Intro to Cross-Site Scripting (XSS)',
      'Positive XSS',
      'Negative XSS & Session Hijacking',
      'Payload Obfuscation',
      'Encrypted Data Exfiltration',
      'XSS Detection & Defense Using AI',
    ],
    speakerName: 'AJMAL RAZAQ BHATTI',
    sessionDate: 'Saturday, 14 March 2026',
    venue: 'Google Meet',
    time: '8:00–9:00 PM',
    category: 'Cybersecurity',
    membersCount: 28,
    description:
      'Explore cross-site scripting from core concepts through obfuscation, exfiltration, and AI-assisted detection and defense. Collaborate on practical payloads and defensive patterns with peers from FAST Society of Cybersecurity.',
  },
  {
    kind: 'seminar',
    id: 'flyer-ai-security',
    title: 'SECURITY ISSUES IN AI SYSTEMS',
    topics: [
      'LLM Security',
      'Intro to LLM Security',
      'LLM attacks',
      'Prompt injection',
      'Sensitive information closure',
      'Supply chain',
    ],
    speakerName: 'DR ANWAR SHAH',
    sessionDate: 'Monday, 2 February 2026',
    venue: 'EDC Room',
    time: '1:45–2:45',
    category: 'AI & LLM Security',
    membersCount: 32,
    description:
      'Survey real-world risks in large language model deployments: attacks, prompt injection, sensitive data handling, and supply-chain concerns. Designed for researchers and practitioners securing modern AI systems.',
  },
  {
    kind: 'ceh',
    id: 'flyer-ceh-4',
    title: 'CERTIFIED ETHICAL HACKING',
    sessionNo: 'SESSION NO. 4',
    trackTitle: 'Web Security',
    learnLabel: "WHAT YOU'LL LEARN",
    learnItems: [
      'TYPES OF VULNERABILITIES',
      'INTRO TO WEB SECURITY',
      'INSECURE DIRECT OBJECT REFERENCE',
      'CROSS SITE SCRIPTING',
      'STORED, REFLECTED, AND DOM-BASED XSS',
    ],
    scheduleDay: 'Wednesday, 19 November 2025',
    scheduleTime: '12:00–1:15 PM',
    venue: 'Room 6',
    contact: '03260142469',
    deliveredBy: 'ANWAAR AHMAD',
    category: 'Ethical Hacking · Web Security',
    membersCount: 22,
    description:
      'Focused web security module covering vulnerability classes, IDOR, and XSS variants. Strengthen your ethical hacking skill set with structured objectives aligned to CEH-style learning outcomes.',
  },
]
