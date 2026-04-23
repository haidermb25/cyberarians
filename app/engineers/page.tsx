import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Github, Mail, Globe, MapPin, Briefcase, Sparkles, type LucideIcon } from 'lucide-react'
import { getAllEngineers } from '@/lib/server/engineers'

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

export default async function EngineersPage() {
  const engineers = await getAllEngineers()

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
                  key={engineer.id}
                  className="p-5 border-2 border-border/80 hover:border-primary/40 hover:shadow-xl transition-all duration-300 flex flex-col bg-gradient-to-br from-card to-primary/5"
                >
                  <div className="flex gap-4">
                    <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-full bg-muted ring-2 ring-primary/10">
                      <Image
                        src={engineer.image || '/icon.svg'}
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
