import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Github, Mail, Globe, MapPin, Briefcase, Sparkles, type LucideIcon } from 'lucide-react'

type Engineer = {
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

const engineers: Engineer[] = [
  {
    name: 'Ali Haider',
    role: 'Lead Engineer and Product Developer',
    image: '/engineers/ali-haider.png',
    location: 'Pakistan',
    experience: '6+ years',
    focus: 'Product Architecture',
    summary: 'Leads end-to-end product engineering with a strong focus on scalable systems and delivery excellence.',
    skills: ['Next.js', 'System Design', 'Cloud', 'DevOps'],
    linkedin: 'https://linkedin.com/in/ali-haider',
    github: 'https://github.com/ali-haider',
    email: 'ali.haider@cybrarian.com',
  },
  {
    name: 'Waris Khan',
    role: 'Software Engineer',
    image: '/engineers/waris-khan.png',
    location: 'Pakistan',
    experience: '4+ years',
    focus: 'Full-Stack Development',
    summary: 'Builds robust web applications and backend services with clean architecture and maintainable code.',
    skills: ['React', 'Node.js', 'TypeScript', 'APIs'],
    linkedin: 'https://linkedin.com/in/waris-khan',
    github: 'https://github.com/waris-khan',
    email: 'waris.khan@cybrarian.com',
  },
  {
    name: 'Amir Hamza',
    role: 'AI Engineer',
    image: '/engineers/amir-hamza.png',
    location: 'Pakistan',
    experience: '4+ years',
    focus: 'Applied AI Systems',
    summary: 'Designs AI-driven solutions, model pipelines, and intelligent workflows for practical business impact.',
    skills: ['LLMs', 'Python', 'MLOps', 'Prompt Engineering'],
    linkedin: 'https://linkedin.com/in/amir-hamza',
    github: 'https://github.com/amir-hamza',
    email: 'amir.hamza@cybrarian.com',
  },
  {
    name: 'Abdullah',
    role: 'Software Engineer',
    image: '/engineers/abdullah.png',
    location: 'Pakistan',
    experience: '3+ years',
    focus: 'Frontend Engineering',
    summary: 'Creates performant, polished interfaces with strong attention to UX consistency and component quality.',
    skills: ['UI/UX', 'React', 'Tailwind', 'Testing'],
    linkedin: 'https://linkedin.com/in/abdullah',
    github: 'https://github.com/abdullah',
    email: 'abdullah@cybrarian.com',
  },
  {
    name: 'Faiez Tariq',
    role: 'Software Engineer',
    image: '/engineers/faiez-tariq.png',
    location: 'Pakistan',
    experience: '3+ years',
    focus: 'Backend & Integrations',
    summary: 'Develops reliable backend modules and integrations with a focus on performance and data integrity.',
    skills: ['REST APIs', 'Databases', 'Security', 'Automation'],
    linkedin: 'https://linkedin.com/in/faiez-tariq',
    github: 'https://github.com/faiez-tariq',
    email: 'faiez.tariq@cybrarian.com',
  },
  {
    name: 'Bushra Abad',
    role: 'Software Engineer',
    image: '/engineers/bushra-abad.png',
    location: 'Pakistan',
    experience: '3+ years',
    focus: 'Application Development',
    summary: 'Builds scalable application features with modern engineering practices and collaborative workflows.',
    skills: ['TypeScript', 'Frontend', 'Backend', 'Documentation'],
    linkedin: 'https://linkedin.com/in/bushra-abad',
    github: 'https://github.com/bushra-abad',
    email: 'bushra.abad@cybrarian.com',
  },
  {
    name: 'Muhammad Bilal',
    role: 'Software Engineer',
    image: '/engineers/muhammad-bilal.png',
    location: 'Pakistan',
    experience: '3+ years',
    focus: 'Web Engineering',
    summary: 'Implements clean, efficient web solutions with a strong focus on reliability and maintainability.',
    skills: ['JavaScript', 'Web Apps', 'Optimization', 'Git'],
    linkedin: 'https://linkedin.com/in/muhammad-bilal',
    github: 'https://github.com/muhammad-bilal',
    email: 'muhammad.bilal@cybrarian.com',
  },
]

function SocialLink({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
      aria-label={label}
    >
      <Icon className="h-4 w-4" />
    </Link>
  )
}

export default function EngineersPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Engineers</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Meet the engineers and technical experts behind Cybrarian.
            </p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {engineers.map((engineer) => (
                <Card
                  key={engineer.name}
                  className="p-5 border-2 border-border/80 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col bg-gradient-to-br from-card to-primary/5"
                >
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-primary/10">
                      <Image
                        src={engineer.image}
                        alt={engineer.name}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-lg text-foreground truncate">{engineer.name}</h3>
                      <p className="text-sm text-primary font-medium mt-0.5">{engineer.role}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                          <Briefcase className="h-3 w-3" />
                          {engineer.experience}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-secondary/10 px-2.5 py-1 text-[11px] font-medium text-secondary">
                          <MapPin className="h-3 w-3" />
                          {engineer.location}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{engineer.summary}</p>
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80 flex items-center gap-1.5">
                      <Sparkles className="h-3.5 w-3.5 text-primary" />
                      Focus Area
                    </p>
                    <p className="text-sm text-foreground mt-1">{engineer.focus}</p>
                  </div>
                  <div className="mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-foreground/80 mb-2">Core Skills</p>
                    <div className="flex flex-wrap gap-2">
                      {engineer.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-md border border-border bg-background px-2.5 py-1 text-xs text-muted-foreground"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-border/60 flex flex-wrap gap-2">
                    {engineer.linkedin && <SocialLink href={engineer.linkedin} icon={Linkedin} label="LinkedIn" />}
                    {engineer.github && <SocialLink href={engineer.github} icon={Github} label="GitHub" />}
                    {engineer.email && (
                      <Link
                        href={`mailto:${engineer.email}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-muted/50 text-muted-foreground transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                        aria-label="Email"
                      >
                        <Mail className="h-4 w-4" />
                      </Link>
                    )}
                    {engineer.website && <SocialLink href={engineer.website} icon={Globe} label="Website" />}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
