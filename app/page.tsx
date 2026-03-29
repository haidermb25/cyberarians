import Link from 'next/link'
import Image from 'next/image'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { HeroBackground } from '@/components/hero-background'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Users, 
  Network, 
  Award, 
  TrendingUp, 
  Globe, 
  BookOpen, 
  Target, 
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Shield,
  Zap,
  FileText,
  GraduationCap,
  Mail
} from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden min-h-[32rem] shadow-[0_4px_24px_-2px_rgba(0,0,0,0.15)]">
          <HeroBackground />
          <div className="absolute inset-0 bg-grid-pattern opacity-5 z-[1]" />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 relative z-10">
            <div className="text-center space-y-8">
              <div className="flex justify-center gap-2 mb-4">
                <Badge className="bg-white/15 text-white border-white/30 hover:bg-white/25 backdrop-blur-sm">
                  <Sparkles className="w-3 h-3 mr-1" />
                  World's Leading Research Platform
                </Badge>
              </div>
              
              <h1 className="text-5xl sm:text-7xl font-bold text-balance leading-tight text-white drop-shadow-sm">
                Connecting Research.
                <span className="block bg-gradient-to-r from-primary-foreground from-80% to-primary/90 bg-clip-text text-transparent mt-2">
                  Building Communities.
                </span>
              </h1>
              
              <p className="text-xl text-white/90 max-w-3xl mx-auto text-pretty leading-relaxed drop-shadow-sm">
                Cybrarian is the premier platform where leading research analysts connect, share insights, 
                and collaborate on groundbreaking research projects that shape our future.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                <Link href="/researchers">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8 h-14 shadow-lg">
                    Browse Researchers
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/communities">
                  <Button size="lg" variant="outline" className="text-lg px-8 h-14 border-white/50 text-white hover:bg-white/15 bg-white/5">
                    Explore Communities
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto pt-12">
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-1">500+</p>
                  <p className="text-sm text-white/80">Researchers</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-1">100+</p>
                  <p className="text-sm text-white/80">Communities</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-white mb-1">50+</p>
                  <p className="text-sm text-white/80">Countries</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Founder Section — Dr. Anwar Shah */}
        <section id="founder" className="py-20 bg-gradient-to-b from-muted/30 to-background border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Founder</Badge>
              <h2 className="text-4xl font-bold mb-3">Meet Our Founder</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The vision behind Cybrarian
              </p>
            </div>

            <Card className="overflow-hidden border-2 shadow-xl shadow-primary/5 max-w-5xl mx-auto">
              <div className="grid md:grid-cols-[minmax(280px,1fr)_1.5fr] gap-0">
                {/* Portrait — separate, professional frame */}
                <div className="relative bg-muted/50 p-6 md:p-8 flex items-center justify-center min-h-[320px] md:min-h-0">
                  <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-2 ring-primary/10">
                    <Image
                      src="/founder/dr-anwar-shah.png"
                      alt="Dr. Anwar Shah — Founder of Cybrarian"
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 768px) 100vw, 360px"
                      priority={false}
                    />
                  </div>
                </div>

                {/* Info + CV */}
                <div className="p-6 sm:p-8 md:p-10 flex flex-col justify-center">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-1">Dr. Anwar Shah</h3>
                  <p className="text-primary font-semibold mb-6">Founder, Cybrarian</p>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Dr. Anwar Shah founded Cybrarian to connect researchers and build communities around rigorous, 
                    impactful work. His vision is a platform where leading analysts share insights and collaborate 
                    on research that shapes the future.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-medium text-primary">
                      <GraduationCap className="w-4 h-4" />
                      Research &amp; Academia
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1.5 text-sm font-medium text-secondary">
                      <BookOpen className="w-4 h-4" />
                      Thought Leadership
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href="/founder/Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button size="lg" className="gap-2 w-full sm:w-auto">
                        <FileText className="w-5 h-5" />
                        Download CV
                      </Button>
                    </a>
                    <Link href="/contact">
                      <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
                        <Mail className="w-5 h-5" />
                        Get in Touch
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Why Choose Cybrarian?</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Everything you need to build and grow your research network
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/50 group">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/70 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Users className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Expert Researchers</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Access comprehensive profiles of leading research analysts with verified credentials, 
                  publications, and impact ratings.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-secondary/50 group">
                <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/70 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Network className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Thriving Communities</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join specialized research communities, collaborate with peers, and stay updated 
                  on the latest developments in your field.
                </p>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-all duration-300 border-2 hover:border-accent/50 group">
                <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/70 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Award className="text-white" size={28} />
                </div>
                <h3 className="font-bold text-xl mb-3">Quality Assured</h3>
                <p className="text-muted-foreground leading-relaxed">
                  All researchers are rated and verified, ensuring you connect with credible 
                  experts who deliver exceptional research quality.
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="bg-gradient-to-b from-background to-muted/20 py-20 border-t">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-xl text-muted-foreground">
                Get started in three simple steps
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                    1
                  </div>
                  <h3 className="text-xl font-bold mb-3">Discover Profiles</h3>
                  <p className="text-muted-foreground">
                    Browse comprehensive researcher profiles with publications, projects, and expertise areas
                  </p>
                </div>
                {/* Connector line for desktop */}
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              <div className="relative">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                    2
                  </div>
                  <h3 className="text-xl font-bold mb-3">Join Communities</h3>
                  <p className="text-muted-foreground">
                    Connect with research communities in your field and participate in collaborative projects
                  </p>
                </div>
                <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                  3
                </div>
                <h3 className="text-xl font-bold mb-3">Start Collaborating</h3>
                <p className="text-muted-foreground">
                  Reach out to researchers, share insights, and work together on breakthrough discoveries
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-4xl font-bold">
                  Empowering Research Excellence Worldwide
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Cybrarian provides a comprehensive platform for researchers to showcase their work, 
                  build their reputation, and collaborate with experts globally.
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Comprehensive Profiles</h3>
                      <p className="text-muted-foreground">
                        Showcase education, publications, projects, awards, and professional links all in one place
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-secondary" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Global Reach</h3>
                      <p className="text-muted-foreground">
                        Connect with researchers from around the world and expand your professional network
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5 text-accent" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Impact Recognition</h3>
                      <p className="text-muted-foreground">
                        Build your reputation through our transparent rating system and community recognition
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                  <Globe className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-bold text-lg mb-2">Global Network</h4>
                  <p className="text-sm text-muted-foreground">
                    Researchers from 50+ countries
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                  <BookOpen className="w-8 h-8 text-secondary mb-3" />
                  <h4 className="font-bold text-lg mb-2">Rich Profiles</h4>
                  <p className="text-sm text-muted-foreground">
                    Detailed academic credentials
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                  <Target className="w-8 h-8 text-accent mb-3" />
                  <h4 className="font-bold text-lg mb-2">Focused Groups</h4>
                  <p className="text-sm text-muted-foreground">
                    Specialized research communities
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-br from-primary/10 to-secondary/5 border-primary/20">
                  <Zap className="w-8 h-8 text-primary mb-3" />
                  <h4 className="font-bold text-lg mb-2">Fast Connections</h4>
                  <p className="text-sm text-muted-foreground">
                    Instant access to experts
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Platform Features */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">Powerful Platform Features</h2>
              <p className="text-xl text-muted-foreground">
                Built for modern research collaboration
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Verified Profiles</h3>
                <p className="text-sm text-muted-foreground">
                  All researcher credentials are verified and regularly updated
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold mb-2">Impact Ratings</h3>
                <p className="text-sm text-muted-foreground">
                  Transparent rating system based on research contributions
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Community Tools</h3>
                <p className="text-sm text-muted-foreground">
                  Organized communities with roles, rules, and member management
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold mb-2">Rich Information</h3>
                <p className="text-sm text-muted-foreground">
                  Publications, projects, awards, and professional links
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonial/Quote Section */}
        <section className="py-20 bg-gradient-to-r from-primary/5 to-secondary/5">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <blockquote className="text-2xl md:text-3xl font-semibold mb-6 leading-relaxed">
              "Cybrarian has transformed how I connect with fellow researchers. 
              The platform makes collaboration effortless and meaningful."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary" />
              <div className="text-left">
                <p className="font-semibold">Dr. Sarah Chen</p>
                <p className="text-sm text-muted-foreground">Lead Research Analyst, Stanford</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-12 bg-gradient-to-br from-primary to-secondary text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 text-center space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                  Ready to Join Our Research Community?
                </h2>
                <p className="text-lg text-white/90 max-w-2xl mx-auto">
                  Discover talented researchers, join specialized communities, and advance your research career today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Link href="/researchers">
                    <Button size="lg" variant="secondary" className="text-lg px-8 h-14">
                      Browse Researchers
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button size="lg" variant="outline" className="text-lg px-8 h-14 bg-white/10 border-white/30 text-white hover:bg-white/20">
                      Contact Us
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Trust Indicators */}
        <section className="py-16 border-t">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center text-sm text-muted-foreground mb-8">
              Trusted by researchers at leading institutions worldwide
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
              <div className="text-center">
                <p className="font-bold text-lg">Stanford</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">MIT</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">Harvard</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg">Caltech</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
