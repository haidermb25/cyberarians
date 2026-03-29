import Link from 'next/link'
import { Mail, Phone, MapPin, Linkedin, Twitter, Github, Globe } from 'lucide-react'

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-gradient-to-b from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Cybrarian
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A modern platform for managing research analyst profiles, building research communities, and facilitating collaboration between researchers worldwide.
            </p>
            <div className="flex gap-3">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-primary" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4 text-primary" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary/10 hover:bg-primary/20 flex items-center justify-center transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/researchers" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Browse Researchers
                </Link>
              </li>
              <li>
                <Link href="/communities" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Explore Communities
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="/faqs" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <a href="mailto:contact@cybrarian.com" className="text-sm font-medium hover:text-primary transition-colors">
                    contact@cybrarian.com
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <a href="tel:+1234567890" className="text-sm font-medium hover:text-primary transition-colors">
                    +1 (234) 567-890
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm text-muted-foreground">Address</p>
                  <p className="text-sm font-medium">
                    123 Research Ave<br />
                    Innovation City, ST 12345
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © {new Date().getFullYear()} Cybrarian. All rights reserved. Connecting research analysts and communities worldwide.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/privacy" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Privacy
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/terms" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                Terms
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link href="/faqs" className="text-xs text-muted-foreground hover:text-primary transition-colors">
                FAQs
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
