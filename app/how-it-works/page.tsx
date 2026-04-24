import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Compass, MessageCircle, BookOpen, Handshake, Briefcase } from 'lucide-react'

const STEPS = [
  {
    step: 1,
    title: 'Explore',
    description:
      'Browse our platform to discover research papers, projects, and ongoing R&D work.',
    Icon: Compass,
  },
  {
    step: 2,
    title: 'Engage',
    description:
      'Join our communities to participate in discussions, attend sessions, and collaborate with others.',
    Icon: MessageCircle,
  },
  {
    step: 3,
    title: 'Learn & Build',
    description:
      'Access shared knowledge, contribute to projects, and build your own ideas with guidance.',
    Icon: BookOpen,
  },
  {
    step: 4,
    title: 'Collaborate',
    description:
      'Work with our team or community members on real-world AI and cybersecurity challenges.',
    Icon: Handshake,
  },
  {
    step: 5,
    title: 'Hire Us',
    description:
      'Businesses and individuals can reach out for custom solutions, consulting, or R&D partnerships.',
    Icon: Briefcase,
  },
] as const

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Explore the platform, engage with the community, learn and build, then collaborate or partner with us
              for custom R&D and consulting.
            </p>
          </div>

          <div className="space-y-6 mb-16">
            {STEPS.map(({ step, title, description, Icon }) => (
              <Card key={step} className="p-6 relative overflow-hidden">
                <div className="absolute top-6 left-6 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <div className="ml-20">
                  <div className="mb-1 flex items-baseline gap-2">
                    <span className="text-sm font-semibold text-primary tabular-nums">Step {step}</span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{title}</h2>
                  <p className="text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Browse projects and research, join a community, or reach out when you need a dedicated team.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/products">
                <Button size="lg">Explore projects</Button>
              </Link>
              <Link href="/communities">
                <Button size="lg" variant="outline">
                  View communities
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="secondary">
                  Contact us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
