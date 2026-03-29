import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export default function SessionsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sessions</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Browse and join research sessions, workshops, and events. Coming soon.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
