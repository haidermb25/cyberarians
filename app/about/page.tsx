import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Users, Target, Lightbulb, Award } from 'lucide-react'

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              About Cybrarian
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Empowering collaborative research and knowledge sharing across the globe
            </p>
          </div>

          {/* Mission Statement */}
          <Card className="p-8 mb-12 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <h2 className="text-2xl font-bold mb-4 text-center">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed text-center text-lg">
              Cybrarian is dedicated to connecting research analysts and building vibrant research communities worldwide. 
              We provide a modern platform where researchers can showcase their expertise, share their work, and collaborate 
              with peers across different domains of knowledge.
            </p>
          </Card>

          {/* Core Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Collaboration</h3>
                    <p className="text-muted-foreground">
                      We believe in the power of collaboration and bringing researchers together to achieve breakthrough discoveries.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Target className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Excellence</h3>
                    <p className="text-muted-foreground">
                      We strive for excellence in research quality and platform functionality to serve our community better.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Innovation</h3>
                    <p className="text-muted-foreground">
                      We embrace innovation and cutting-edge technology to facilitate modern research practices.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Recognition</h3>
                    <p className="text-muted-foreground">
                      We celebrate and recognize the achievements of researchers through comprehensive profiles and ratings.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          {/* What We Offer */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3">Comprehensive Researcher Profiles</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Create detailed profiles showcasing your education, publications, projects, awards, and professional links. 
                  Build your academic presence and connect with collaborators worldwide.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3">Research Communities</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Join or create specialized research communities focused on specific domains. Collaborate with peers, 
                  share insights, and advance collective knowledge in your field.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3">Impact Recognition</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our rating system recognizes the impact and contributions of researchers, helping you discover 
                  leading experts and build your own reputation in the research community.
                </p>
              </Card>

              <Card className="p-6">
                <h3 className="text-xl font-bold mb-3">Global Network</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Connect with researchers from diverse backgrounds and locations. Break down geographical barriers 
                  and foster international collaboration.
                </p>
              </Card>
            </div>
          </div>

          {/* Our Story */}
          <Card className="p-8 bg-gradient-to-br from-muted/50 to-background">
            <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="leading-relaxed mb-4">
                Cybrarian was born from the vision of making research collaboration more accessible and efficient. 
                In an increasingly connected world, we recognized the need for a dedicated platform where researchers 
                could easily discover each other, share their work, and build meaningful professional relationships.
              </p>
              <p className="leading-relaxed mb-4">
                Our platform combines modern technology with an intuitive user experience to create a space where 
                research excellence is celebrated and collaboration flourishes. Whether you're an established researcher 
                or just beginning your academic journey, Cybrarian provides the tools and community you need to succeed.
              </p>
              <p className="leading-relaxed">
                Today, we're proud to serve researchers across multiple disciplines, facilitating connections that lead 
                to groundbreaking discoveries and advancing knowledge for the benefit of humanity.
              </p>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
