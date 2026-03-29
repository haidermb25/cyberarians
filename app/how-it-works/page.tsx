import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { UserPlus, FileText, Users, Search, Award, MessageSquare } from 'lucide-react'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">How Cybrarian Works</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A simple guide to getting started and making the most of our platform
            </p>
          </div>

          {/* For Researchers */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              For Researchers
            </h2>
            
            <div className="space-y-6">
              {/* Step 1 */}
              <Card className="p-6 relative overflow-hidden">
                <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="ml-20">
                  <div className="flex items-center gap-3 mb-3">
                    <UserPlus className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Create Your Profile</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Contact an administrator to set up your comprehensive researcher profile. Include your education, 
                    publications, ongoing projects, awards, and professional links (ORCID, Google Scholar, LinkedIn).
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Add your academic credentials and affiliations</li>
                    <li>List your publications and research papers</li>
                    <li>Showcase your projects and grants</li>
                    <li>Highlight your awards and achievements</li>
                    <li>Connect your professional profiles</li>
                  </ul>
                </div>
              </Card>

              {/* Step 2 */}
              <Card className="p-6 relative overflow-hidden">
                <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="ml-20">
                  <div className="flex items-center gap-3 mb-3">
                    <FileText className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Build Your Presence</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Maintain an up-to-date profile that showcases your latest work and achievements. Your profile is 
                    your academic portfolio visible to the global research community.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Regular profile updates keep your network informed</li>
                    <li>Build your impact rating through quality contributions</li>
                    <li>Make your research interests clear and discoverable</li>
                  </ul>
                </div>
              </Card>

              {/* Step 3 */}
              <Card className="p-6 relative overflow-hidden">
                <div className="absolute top-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="ml-20">
                  <div className="flex items-center gap-3 mb-3">
                    <Users className="w-6 h-6 text-primary" />
                    <h3 className="text-2xl font-bold">Join Communities</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Participate in research communities related to your fields of expertise. Connect with like-minded 
                    researchers and expand your professional network.
                  </p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-1 ml-4">
                    <li>Find communities matching your research interests</li>
                    <li>Engage with community members and share insights</li>
                    <li>Collaborate on cross-disciplinary projects</li>
                  </ul>
                </div>
              </Card>
            </div>
          </div>

          {/* For Visitors */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
              For Visitors & Collaborators
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Search className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Discover Researchers</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Browse our comprehensive directory of researchers. Search by name, expertise, or research interests 
                  to find the perfect collaborator for your project.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Review Credentials</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Access detailed researcher profiles including publications, projects, education, and impact ratings 
                  to make informed collaboration decisions.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Explore Communities</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Discover active research communities across various domains. See community members, founders, 
                  and ongoing collaborative initiatives.
                </p>
              </Card>

              <Card className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <MessageSquare className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl font-bold">Make Connections</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Use contact information and professional links to reach out to researchers and initiate 
                  collaborative opportunities.
                </p>
              </Card>
            </div>
          </div>

          {/* Key Features */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20 mb-12">
            <h2 className="text-3xl font-bold mb-6 text-center">Key Platform Features</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">📊</div>
                <h3 className="font-bold mb-2">Impact Ratings</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent rating system recognizing researcher contributions
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">🔍</div>
                <h3 className="font-bold mb-2">Smart Search</h3>
                <p className="text-sm text-muted-foreground">
                  Powerful search to find researchers by expertise and interests
                </p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">🌐</div>
                <h3 className="font-bold mb-2">Global Network</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with researchers worldwide, breaking geographical barriers
                </p>
              </div>
            </div>
          </Card>

          {/* CTA */}
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-muted-foreground mb-6">
              Explore our platform and connect with the global research community
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Link href="/researchers">
                <Button size="lg">Browse Researchers</Button>
              </Link>
              <Link href="/communities">
                <Button size="lg" variant="outline">Explore Communities</Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
