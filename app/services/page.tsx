import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Users, 
  Network, 
  Search, 
  Award, 
  BookOpen, 
  LineChart, 
  UserPlus, 
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  GraduationCap,
  Brain,
  Globe,
  Cloud,
  Cog
} from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive solutions for research networking, community building, and academic collaboration
            </p>
          </div>
        </section>

        {/* Main Services — Professional cards with bullets */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-3">What We Offer</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Professional services across security, AI, cloud, and product engineering
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Sessions / Training */}
              <Card className="overflow-hidden border-2 border-border/80 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group bg-card">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-6 pt-6 pb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 text-foreground">Sessions / Training &amp; Sessions</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Structured workshops and hands-on training across security and AI tools.
                  </p>
                </div>
                <div className="px-6 pb-6 pt-4">
                  <ul className="space-y-2.5">
                    {['Cyber Security', 'C&H Training', 'Cyber Security Basics', 'Cyber Security Tools', 'CPENT', 'AI Tools'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* AI */}
              <Card className="overflow-hidden border-2 border-border/80 hover:border-secondary/40 hover:shadow-xl transition-all duration-300 group bg-card">
                <div className="bg-gradient-to-br from-secondary/10 to-secondary/5 px-6 pt-6 pb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Brain className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 text-foreground">AI (ML, Deep Learning, LLMs, Agentic AI)</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Full-spectrum Artificial Intelligence—from classical ML to agentic systems.
                  </p>
                </div>
                <div className="px-6 pb-6 pt-4">
                  <ul className="space-y-2.5">
                    {['Machine Learning', 'Deep Learning', 'Large Language Models (LLMs)', 'Agentic AI', 'Model fine-tuning & deployment', 'AI strategy & integration'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* AI & Web Solutions */}
              <Card className="overflow-hidden border-2 border-border/80 hover:border-primary/40 hover:shadow-xl transition-all duration-300 group bg-card">
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 px-6 pt-6 pb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Globe className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 text-foreground">AI &amp; Web Solutions</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Research-based products with AI and Security at the core.
                  </p>
                </div>
                <div className="px-6 pb-6 pt-4">
                  <ul className="space-y-2.5">
                    {['AI-powered web applications', 'Security-integrated solutions', 'Research-to-product development', 'Custom dashboards & APIs', 'Enterprise web platforms', 'Compliance & audit-ready systems'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Cloud Infrastructure */}
              <Card className="overflow-hidden border-2 border-border/80 hover:border-accent/40 hover:shadow-xl transition-all duration-300 group bg-card">
                <div className="bg-gradient-to-br from-accent/10 to-accent/5 px-6 pt-6 pb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-accent to-accent/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                    <Cloud className="w-7 h-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold mt-4 text-foreground">Cloud Infrastructure</h3>
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Scalable, secure cloud planning and deployment for any workload.
                  </p>
                </div>
                <div className="px-6 pb-6 pt-4">
                  <ul className="space-y-2.5">
                    {['Cloud architecture & design', 'Scalable deployment (AWS, Azure, GCP)', 'Security hardening & compliance', 'CI/CD pipelines', 'Monitoring & observability', 'Cost optimization & governance'].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>

              {/* Product Engineering — full width on 2-col grid */}
              <Card className="overflow-hidden border-2 border-border/80 hover:border-secondary/40 hover:shadow-xl transition-all duration-300 group bg-card md:col-span-2">
                <div className="md:flex md:items-stretch">
                  <div className="md:w-2/5 bg-gradient-to-br from-secondary/10 to-secondary/5 px-6 pt-6 pb-4 md:pb-6">
                    <div className="w-14 h-14 bg-gradient-to-br from-secondary to-secondary/80 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
                      <Cog className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <h3 className="text-xl font-bold mt-4 text-foreground">Product Engineering</h3>
                    <p className="text-sm text-muted-foreground mt-1.5">
                      End-to-end engineering of robust, production-ready products.
                    </p>
                  </div>
                  <div className="px-6 pb-6 pt-4 md:pt-6 md:flex-1 md:flex md:items-center">
                    <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-muted-foreground">
                      {['Requirements & discovery', 'System design & architecture', 'Development & testing', 'DevOps & deployment', 'Performance & scalability', 'Maintenance & support'].map((item) => (
                        <li key={item} className="flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-secondary flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-20 bg-muted/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Additional Features</h2>
              <p className="text-lg text-muted-foreground">
                More tools to enhance your research experience
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <UserPlus className="w-10 h-10 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">People Management</h3>
                <p className="text-sm text-muted-foreground">
                  Add and manage general people alongside researchers for flexible community building
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <Award className="w-10 h-10 text-secondary mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Custom Roles</h3>
                <p className="text-sm text-muted-foreground">
                  Define custom roles for community members with specific permissions and responsibilities
                </p>
              </Card>

              <Card className="p-6 text-center hover:shadow-lg transition-shadow">
                <MessageSquare className="w-10 h-10 text-accent mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">Direct Communication</h3>
                <p className="text-sm text-muted-foreground">
                  Contact researchers directly through provided email and professional links
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing/Plans Section */}
        <section className="py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
              <p className="text-lg text-muted-foreground">
                Choose the plan that fits your needs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-2">Free</h3>
                <p className="text-4xl font-bold text-primary mb-4">$0</p>
                <p className="text-muted-foreground mb-6">For individual researchers</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Browse all researchers</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Join communities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Basic profile</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Get Started
                  </Button>
                </Link>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-shadow border-2 border-primary relative">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold">Most Popular</div>
                </div>
                <h3 className="text-2xl font-bold mb-2">Professional</h3>
                <p className="text-4xl font-bold text-primary mb-4">Contact</p>
                <p className="text-muted-foreground mb-6">For research teams</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Everything in Free</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Enhanced profile</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Create communities</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Priority support</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button className="w-full bg-primary">
                    Contact Sales
                  </Button>
                </Link>
              </Card>

              <Card className="p-8 hover:shadow-xl transition-shadow">
                <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                <p className="text-4xl font-bold text-primary mb-4">Custom</p>
                <p className="text-muted-foreground mb-6">For institutions</p>
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Everything in Professional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Custom branding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>API access</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-primary" />
                    <span>Dedicated support</span>
                  </li>
                </ul>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        </section>

        {/* Service Categories */}
        <section className="py-20 bg-gradient-to-b from-muted/20 to-background">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-center mb-12">What We Provide</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Profile Hosting</h3>
                <p className="text-sm text-muted-foreground">
                  Secure and reliable hosting for researcher profiles
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Network className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-bold mb-2">Networking</h3>
                <p className="text-sm text-muted-foreground">
                  Connect with researchers across disciplines
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LineChart className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold mb-2">Analytics</h3>
                <p className="text-sm text-muted-foreground">
                  Track your research impact and engagement
                </p>
              </Card>

              <Card className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-bold mb-2">Support</h3>
                <p className="text-sm text-muted-foreground">
                  Dedicated support team for all your needs
                </p>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="p-12 bg-gradient-to-br from-primary to-secondary text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
              <p className="text-lg mb-8 text-white/90">
                Join thousands of researchers already using Cybrarian to advance their work
              </p>
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="text-lg px-8">
                  Contact Us Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
