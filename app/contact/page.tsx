'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/hooks/use-toast'
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send,
  MessageSquare,
  Loader2
} from 'lucide-react'

export default function ContactPage() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    // Simulate form submission
    setTimeout(() => {
      toast({
        title: 'Message Sent!',
        description: 'Thank you for contacting us. We\'ll get back to you soon.',
      })
      setFormData({ name: '', email: '', subject: '', message: '' })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Have questions? We're here to help. Reach out to our team and we'll respond as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Contact Info Cards */}
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Email Us</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Send us an email anytime
                      </p>
                      <a href="mailto:contact@cybrarian.com" className="text-primary hover:underline text-sm">
                        contact@cybrarian.com
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-accent rounded-lg flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Call Us</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Mon-Fri from 9am to 6pm
                      </p>
                      <a href="tel:+1234567890" className="text-primary hover:underline text-sm">
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Visit Us</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Our office location
                      </p>
                      <p className="text-sm">
                        123 Research Ave<br />
                        Innovation City, ST 12345
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-accent to-secondary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2">Working Hours</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Monday - Friday
                      </p>
                      <p className="text-sm">
                        9:00 AM - 6:00 PM EST
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <Card className="p-8">
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                      <MessageSquare className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-bold">Send Us a Message</h2>
                    </div>
                    <p className="text-muted-foreground">
                      Fill out the form below and we'll get back to you within 24 hours
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Your Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={e => setFormData({ ...formData, name: e.target.value })}
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={e => setFormData({ ...formData, email: e.target.value })}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        value={formData.subject}
                        onChange={e => setFormData({ ...formData, subject: e.target.value })}
                        placeholder="How can we help you?"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={e => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" disabled={loading}>
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </Card>

                {/* Additional Info */}
                <Card className="p-6 mt-6 bg-primary/5 border-primary/20">
                  <h3 className="font-bold mb-3">Need Immediate Assistance?</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    For urgent matters, please call us directly or check our FAQ page for quick answers.
                  </p>
                  <div className="flex gap-3">
                    <Link href="/faqs">
                      <Button variant="outline" size="sm">
                        View FAQs
                      </Button>
                    </Link>
                    <a href="tel:+1234567890">
                      <Button variant="outline" size="sm">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Now
                      </Button>
                    </a>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
