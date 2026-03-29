'use client'

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { MessageSquare } from 'lucide-react'

export default function FAQsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Cybrarian
            </p>
          </div>

          {/* General Questions */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm">
                1
              </span>
              General Questions
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-left">
                  What is Cybrarian?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Cybrarian is a modern platform designed to connect research analysts and build vibrant research 
                  communities worldwide. We provide comprehensive researcher profiles, community management tools, 
                  and collaboration features to facilitate academic and professional networking.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-left">
                  Who can use Cybrarian?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Cybrarian is designed for research analysts, academics, scientists, and anyone involved in research. 
                  Visitors can browse researcher profiles and communities, while researchers can have profiles created 
                  by administrators to showcase their work and connect with peers.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger className="text-left">
                  Is Cybrarian free to use?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! Browsing researcher profiles and exploring communities is completely free. Contact our 
                  administrators to set up your researcher profile and join the community.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {/* For Researchers */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm">
                2
              </span>
              For Researchers
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-4">
                <AccordionTrigger className="text-left">
                  How do I create a researcher profile?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Contact our platform administrators to create your researcher profile. They will help you set up 
                  a comprehensive profile including your education, publications, projects, awards, and professional 
                  links. You'll need to provide details about your academic background and research work.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger className="text-left">
                  What information should I include in my profile?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  A complete profile includes: full name, title/position, affiliation, contact information, 
                  research interests, bio, education history, publications, ongoing projects, awards and honors, 
                  and links to your ORCID, Google Scholar, LinkedIn, and personal website.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger className="text-left">
                  How is the impact rating calculated?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Impact ratings are assigned by administrators based on factors such as publication quality, 
                  research contributions, awards, grants received, and overall influence in your field. 
                  Ratings range from 0 to 5.0.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-7">
                <AccordionTrigger className="text-left">
                  Can I update my profile information?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! Contact the administrators with your updated information, and they will update your profile. 
                  We encourage researchers to keep their profiles current with latest publications and achievements.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {/* Communities */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm">
                3
              </span>
              Research Communities
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-8">
                <AccordionTrigger className="text-left">
                  What are research communities?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Research communities are groups of researchers working in related fields or on similar topics. 
                  They provide a space for collaboration, knowledge sharing, and networking. Each community has 
                  members with different roles, including founders and regular members.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-9">
                <AccordionTrigger className="text-left">
                  How do I join a community?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Administrators can add you to communities that match your research interests. Browse our communities 
                  page to find groups relevant to your work, then contact us to request membership.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-10">
                <AccordionTrigger className="text-left">
                  Can I create a new community?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes! If you'd like to create a new research community, contact our administrators with details 
                  about your proposed community, its focus area, and why it would benefit the research network.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {/* Technical & Support */}
          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm">
                4
              </span>
              Technical & Support
            </h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-11">
                <AccordionTrigger className="text-left">
                  How do I search for researchers?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Use the search bar on the Researchers page to search by name or expertise. You can filter results 
                  based on research interests, and click on any profile to view detailed information including 
                  publications, projects, and contact details.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-12">
                <AccordionTrigger className="text-left">
                  How can I contact a researcher?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Each researcher profile includes contact information such as email and phone number. You can also 
                  find links to their professional profiles (ORCID, Google Scholar, LinkedIn) and personal websites 
                  where applicable.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-13">
                <AccordionTrigger className="text-left">
                  Who do I contact for support?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  For any questions, issues, or requests, please contact us at contact@cybrarian.com or call 
                  +1 (234) 567-890. Our team is here to help you make the most of the platform.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-14">
                <AccordionTrigger className="text-left">
                  Is my data secure?
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  Yes, we take data security seriously. Your information is stored securely, and we follow best 
                  practices for data protection. See our Privacy Policy for more details about how we handle your data.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>

          {/* Still have questions */}
          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can't find the answer you're looking for? We're here to help!
              </p>
              <p className="text-sm">
                Contact us at{' '}
                <a href="mailto:contact@cybrarian.com" className="text-primary hover:underline font-semibold">
                  contact@cybrarian.com
                </a>
              </p>
            </div>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  )
}
