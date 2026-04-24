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

const FAQ_ITEMS = [
  {
    value: 'item-1',
    question: 'What is Cyberarians?',
    answer:
      'Cyberarians is a research and development platform focused on Artificial Intelligence and Cybersecurity, where we showcase projects, publish research, and collaborate with communities.',
  },
  {
    value: 'item-2',
    question: 'What kind of projects do you work on?',
    answer:
      'We work on AI models, cybersecurity tools, research prototypes, automation systems, and experimental technologies.',
  },
  {
    value: 'item-3',
    question: 'Can I collaborate with Cyberarians?',
    answer:
      'Yes. We welcome students, researchers, and professionals to collaborate through our communities or project initiatives.',
  },
  {
    value: 'item-4',
    question: 'Do you provide services to clients?',
    answer:
      'Yes. We offer R&D services, AI solutions, cybersecurity consulting, and custom project development.',
  },
  {
    value: 'item-5',
    question: 'Are your research papers publicly available?',
    answer:
      'Most of our research is publicly showcased, but some may be restricted depending on confidentiality or client agreements.',
  },
  {
    value: 'item-6',
    question: 'How can I join your community?',
    answer: 'You can join through our website by signing up and selecting your area of interest.',
  },
  {
    value: 'item-7',
    question: 'Do you organize events or workshops?',
    answer:
      'Yes. We regularly host sessions, workshops, and events focused on AI and cybersecurity.',
  },
  {
    value: 'item-8',
    question: 'Is Cyberarians free to use?',
    answer:
      'Basic access to projects and research is free. Some advanced resources or services may be paid.',
  },
] as const

export default function FAQsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about Cyberarians
            </p>
          </div>

          <Card className="p-6 mb-8">
            <h2 className="text-2xl font-bold mb-6">FAQs</h2>
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map(item => (
                <AccordionItem key={item.value} value={item.value}>
                  <AccordionTrigger className="text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </Card>

          <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
            <div className="text-center">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
              <p className="text-muted-foreground mb-4">
                Can&apos;t find the answer you&apos;re looking for? We&apos;re here to help!
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
