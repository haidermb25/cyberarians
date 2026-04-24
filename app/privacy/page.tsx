import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Shield } from 'lucide-react'

export default function PrivacyPage() {
  const currentDate = new Date(2026, 1, 24) // Fixed date: February 24, 2026
  
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                Welcome to Cyberarians. We respect your privacy and are committed to protecting your personal data. 
                This privacy policy explains how we collect, use, and safeguard your information when you use our platform.
              </p>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Personal Information</h3>
                  <p className="leading-relaxed">
                    When you create a researcher profile, we collect information including:
                  </p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Full name and professional title</li>
                    <li>Institutional affiliation</li>
                    <li>Contact information (email, phone number)</li>
                    <li>Academic credentials and education history</li>
                    <li>Professional profile links (ORCID, Google Scholar, LinkedIn)</li>
                    <li>Profile photograph</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Research Information</h3>
                  <p className="leading-relaxed">We collect and display:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Research interests and expertise areas</li>
                    <li>Publications and academic papers</li>
                    <li>Research projects and grants</li>
                    <li>Awards and honors</li>
                    <li>Bio and research summary</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Usage Data</h3>
                  <p className="leading-relaxed">We automatically collect:</p>
                  <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent on pages</li>
                    <li>IP address and location data</li>
                    <li>Device information</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">We use your information to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Create and maintain your researcher profile</li>
                  <li>Display your information to visitors and other researchers</li>
                  <li>Facilitate connections within research communities</li>
                  <li>Improve our platform and user experience</li>
                  <li>Send important updates about your profile or the platform</li>
                  <li>Respond to your inquiries and provide support</li>
                  <li>Analyze platform usage and trends</li>
                  <li>Maintain security and prevent fraud</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Information Sharing and Disclosure</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Public Information</h3>
                  <p className="leading-relaxed">
                    Your researcher profile is publicly accessible and can be viewed by anyone visiting our platform. 
                    This includes your name, photo, affiliation, research interests, publications, and contact information 
                    you choose to provide.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Third-Party Services</h3>
                  <p className="leading-relaxed">
                    We do not sell your personal information to third parties. We may share data with trusted service 
                    providers who help us operate our platform (hosting, analytics, etc.), under strict confidentiality 
                    agreements.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Legal Requirements</h3>
                  <p className="leading-relaxed">
                    We may disclose your information if required by law or in response to valid legal requests.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Data Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal data against 
                unauthorized access, alteration, disclosure, or destruction. However, no internet transmission is 
                completely secure, and we cannot guarantee absolute security.
              </p>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">You have the right to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Access the personal information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your profile and associated data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing</li>
                  <li>Data portability (receive your data in a structured format)</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  To exercise these rights, please contact us at{' '}
                  <a href="mailto:privacy@cybrarian.com" className="text-primary hover:underline">
                    privacy@cybrarian.com
                  </a>
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Cookies and Tracking</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use cookies and similar tracking technologies to track activity on our platform and hold certain 
                information. Cookies are files with small amounts of data that are sent to your browser. You can 
                instruct your browser to refuse all cookies or indicate when a cookie is being sent.
              </p>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Data Retention</h2>
              <p className="text-muted-foreground leading-relaxed">
                We retain your personal information for as long as necessary to fulfill the purposes outlined in this 
                privacy policy, unless a longer retention period is required by law. When you request deletion, we will 
                remove your data from our active systems, though some information may remain in backups for a limited time.
              </p>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Children's Privacy</h2>
              <p className="text-muted-foreground leading-relaxed">
                Our platform is not intended for individuals under the age of 18. We do not knowingly collect personal 
                information from children. If you believe we have collected information from a child, please contact us 
                immediately.
              </p>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of any changes by posting the 
                new privacy policy on this page and updating the "Last updated" date. We encourage you to review this 
                policy periodically.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="text-muted-foreground space-y-2">
                <p>
                  <span className="font-semibold text-foreground">Email:</span>{' '}
                  <a href="mailto:privacy@cybrarian.com" className="text-primary hover:underline">
                    privacy@cybrarian.com
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-foreground">Phone:</span>{' '}
                  <a href="tel:+1234567890" className="text-primary hover:underline">
                    +1 (234) 567-890
                  </a>
                </p>
                <p>
                  <span className="font-semibold text-foreground">Address:</span> 123 Research Ave, Innovation City, ST 12345
                </p>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
