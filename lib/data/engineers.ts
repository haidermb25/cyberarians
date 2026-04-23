export type Engineer = {
  id: string
  name: string
  role: string
  image: string
  location: string
  experience: string
  focus: string
  summary: string
  skills: string[]
  linkedin?: string
  github?: string
  email?: string
  website?: string
}

export const ENGINEERS: Engineer[] = [
  {
    id: 'ali-haider',
    name: 'Ali Haider',
    role: 'Lead Engineer and Product Developer',
    image: '/engineers/ali-haider.png',
    location: 'Pakistan',
    experience: '6+ years',
    focus: 'Product Architecture',
    summary:
      'Leads end-to-end product engineering with a strong focus on scalable systems and delivery excellence.',
    skills: ['Next.js', 'System Design', 'Cloud', 'DevOps'],
    linkedin: 'https://linkedin.com/in/ali-haider',
    github: 'https://github.com/ali-haider',
    email: 'ali.haider@cybrarian.com',
  },
  {
    id: 'waris-khan',
    name: 'Waris Khan',
    role: 'Software Engineer',
    image: '/engineers/waris-khan.png',
    location: 'Pakistan',
    experience: '4+ years',
    focus: 'Full-Stack Development',
    summary:
      'Builds robust web applications and backend services with clean architecture and maintainable code.',
    skills: ['React', 'Node.js', 'TypeScript', 'APIs'],
    linkedin: 'https://linkedin.com/in/waris-khan',
    github: 'https://github.com/waris-khan',
    email: 'waris.khan@cybrarian.com',
  },
  {
    id: 'amir-hamza',
    name: 'Amir Hamza',
    role: 'AI Engineer',
    image: '/engineers/amir-hamza.png',
    location: 'Pakistan',
    experience: '4+ years',
    focus: 'Applied AI Systems',
    summary:
      'Designs AI-driven solutions, model pipelines, and intelligent workflows for practical business impact.',
    skills: ['LLMs', 'Python', 'MLOps', 'Prompt Engineering'],
    linkedin: 'https://linkedin.com/in/amir-hamza',
    github: 'https://github.com/amir-hamza',
    email: 'amir.hamza@cybrarian.com',
  },
  {
    id: 'abdullah',
    name: 'Abdullah',
    role: 'Software Engineer',
    image: '/engineers/abdullah.png',
    location: 'Pakistan',
    experience: '3+ years',
    focus: 'Frontend Engineering',
    summary:
      'Creates performant, polished interfaces with strong attention to UX consistency and component quality.',
    skills: ['UI/UX', 'React', 'Tailwind', 'Testing'],
    linkedin: 'https://linkedin.com/in/abdullah',
    github: 'https://github.com/abdullah',
    email: 'abdullah@cybrarian.com',
  },
  {
    id: 'faiez-tariq',
    name: 'Faiez Tariq',
    role: 'Software Engineer',
    image: '/engineers/faiez-tariq.png',
    location: 'Pakistan',
    experience: '3+ years',
    focus: 'Backend & Integrations',
    summary:
      'Develops reliable backend modules and integrations with a focus on performance and data integrity.',
    skills: ['REST APIs', 'Databases', 'Security', 'Automation'],
    linkedin: 'https://linkedin.com/in/faiez-tariq',
    github: 'https://github.com/faiez-tariq',
    email: 'faiez.tariq@cybrarian.com',
  },
  {
    id: 'bushra-abad',
    name: 'Bushra Abad',
    role: 'Software Engineer',
    image: '/engineers/bushra-abad.png',
    location: 'Pakistan',
    experience: '3+ years',
    focus: 'Application Development',
    summary:
      'Builds scalable application features with modern engineering practices and collaborative workflows.',
    skills: ['TypeScript', 'Frontend', 'Backend', 'Documentation'],
    linkedin: 'https://linkedin.com/in/bushra-abad',
    github: 'https://github.com/bushra-abad',
    email: 'bushra.abad@cybrarian.com',
  },
  {
    id: 'muhammad-bilal',
    name: 'Muhammad Bilal',
    role: 'Software Engineer',
    image: '/engineers/muhammad-bilal.png',
    location: 'Pakistan',
    experience: '3+ years',
    focus: 'Web Engineering',
    summary:
      'Implements clean, efficient web solutions with a strong focus on reliability and maintainability.',
    skills: ['JavaScript', 'Web Apps', 'Optimization', 'Git'],
    linkedin: 'https://linkedin.com/in/muhammad-bilal',
    github: 'https://github.com/muhammad-bilal',
    email: 'muhammad.bilal@cybrarian.com',
  },
]
