import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { FileText } from 'lucide-react'

export default function TermsPage() {
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
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using Cyberarians, you agree to be bound by these Terms of Service and all applicable 
                laws and regulations. If you do not agree with any of these terms, you are prohibited from using or 
                accessing this platform.
              </p>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Use License</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  Permission is granted to temporarily access the materials (information or software) on Cyberarians&apos; 
                  platform for personal, non-commercial viewing only. This is the grant of a license, not a transfer 
                  of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or public display</li>
                  <li>Attempt to reverse engineer any software contained on Cyberarians&apos; platform</li>
                  <li>Remove any copyright or proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  This license shall automatically terminate if you violate any of these restrictions and may be 
                  terminated by Cyberarians at any time.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">User Accounts and Profiles</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Profile Creation</h3>
                  <p className="leading-relaxed">
                    Researcher profiles are created and managed by platform administrators. By requesting a profile, 
                    you agree to provide accurate, current, and complete information about yourself.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Profile Accuracy</h3>
                  <p className="leading-relaxed">
                    You are responsible for maintaining the accuracy of information in your profile. You must notify 
                    administrators of any changes to ensure your profile remains current and accurate.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Public Display</h3>
                  <p className="leading-relaxed">
                    By creating a profile, you consent to having your professional information displayed publicly on 
                    the platform, including but not limited to your name, photo, contact information, research 
                    interests, publications, and achievements.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Acceptable Use</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">You agree not to:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Use the platform for any unlawful purpose</li>
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit any harmful or malicious code</li>
                  <li>Attempt to gain unauthorized access to the platform</li>
                  <li>Interfere with or disrupt the platform's operation</li>
                  <li>Collect or harvest information about other users</li>
                  <li>Impersonate any person or entity</li>
                  <li>Post false, misleading, or fraudulent information</li>
                  <li>Harass, abuse, or harm other users</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Intellectual Property</h2>
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Platform Content</h3>
                  <p className="leading-relaxed">
                    The platform, including its design, features, and functionality, is owned by Cyberarians and is 
                    protected by international copyright, trademark, and other intellectual property laws.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">User Content</h3>
                  <p className="leading-relaxed">
                    You retain all rights to your research work, publications, and other content you provide for 
                    your profile. By providing content, you grant Cyberarians a non-exclusive, worldwide license to 
                    display and distribute this content on the platform.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Third-Party Content</h3>
                  <p className="leading-relaxed">
                    Links to third-party websites (ORCID, Google Scholar, LinkedIn, etc.) are provided for convenience. 
                    Cyberarians is not responsible for the content of these external sites.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Research Communities</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  Research communities are managed by administrators. By participating in communities:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>You agree to engage professionally and respectfully with other members</li>
                  <li>You understand community membership can be modified by administrators</li>
                  <li>You acknowledge that communities are public and visible to all platform visitors</li>
                  <li>You agree to follow any community-specific guidelines or rules</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Disclaimer</h2>
              <div className="space-y-4 text-muted-foreground">
                <p className="leading-relaxed">
                  The materials on Cyberarians&apos; platform are provided on an 'as is' basis. Cyberarians makes no 
                  warranties, expressed or implied, and hereby disclaims and negates all other warranties including, 
                  without limitation, implied warranties or conditions of merchantability, fitness for a particular 
                  purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="leading-relaxed">
                  Cyberarians does not warrant or make any representations concerning the accuracy, likely results, or 
                  reliability of the use of the materials on its platform or otherwise relating to such materials or 
                  on any sites linked to this platform.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Cyberarians or its suppliers be liable for any damages (including, without limitation, 
                damages for loss of data or profit, or due to business interruption) arising out of the use or inability 
                to use the materials on Cyberarians&apos; platform, even if Cyberarians or an authorized Cyberarians representative 
                has been notified orally or in writing of the possibility of such damage.
              </p>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on Cyberarians&apos; platform could include technical, typographical, or photographic 
                errors. Cyberarians does not warrant that any of the materials on its platform are accurate, complete, or 
                current. Cyberarians may make changes to the materials contained on its platform at any time without notice.
              </p>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cyberarians may revise these Terms of Service at any time without notice. By using this platform, you are 
                agreeing to be bound by the then current version of these Terms of Service. We will notify users of 
                material changes to these terms through the platform or via email.
              </p>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Termination</h2>
              <div className="space-y-3 text-muted-foreground">
                <p className="leading-relaxed">
                  We reserve the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Suspend or terminate your access to the platform</li>
                  <li>Remove your profile or community membership</li>
                  <li>Take appropriate legal action for any violations</li>
                </ul>
                <p className="leading-relaxed mt-4">
                  You may request deletion of your profile at any time by contacting administrators.
                </p>
              </div>
            </Card>

            <Card className="p-8 mb-6">
              <h2 className="text-2xl font-bold mb-4">Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction 
                in which Cyberarians operates, and you irrevocably submit to the exclusive jurisdiction of the courts in 
                that location.
              </p>
            </Card>

            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms of Service, please contact us:
              </p>
              <div className="text-muted-foreground space-y-2">
                <p>
                  <span className="font-semibold text-foreground">Email:</span>{' '}
                  <a href="mailto:legal@cybrarian.com" className="text-primary hover:underline">
                    legal@cybrarian.com
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
