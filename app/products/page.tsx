'use client'

import { useEffect, useState } from 'react'
import type { LucideIcon } from 'lucide-react'
import {
  Package,
  GraduationCap,
  Brain,
  Globe,
  Cloud,
  Cog,
  Shield,
  Zap,
  Layers,
  Cpu,
  Sparkles,
  Box,
  CheckCircle2,
} from 'lucide-react'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import type { Product } from '@/lib/types/product'
import { cn } from '@/lib/utils'

const ICON_MAP: Record<string, LucideIcon> = {
  package: Package,
  box: Box,
  graduation: GraduationCap,
  graduationcap: GraduationCap,
  brain: Brain,
  globe: Globe,
  cloud: Cloud,
  cog: Cog,
  shield: Shield,
  zap: Zap,
  layers: Layers,
  cpu: Cpu,
  sparkles: Sparkles,
}

function resolveIconKey(raw: string | null): LucideIcon {
  if (!raw) return Package
  const k = raw.toLowerCase().replace(/[\s_-]+/g, '')
  return ICON_MAP[k] ?? Package
}

type Accent = 'primary' | 'secondary' | 'accent'

function accentForIndex(i: number): Accent {
  const m = i % 3
  if (m === 0) return 'primary'
  if (m === 1) return 'secondary'
  return 'accent'
}

const accentStyles: Record<
  Accent,
  {
    header: string
    iconWrap: string
    check: string
    hoverBorder: string
  }
> = {
  primary: {
    header: 'from-primary/10 to-primary/5',
    iconWrap: 'from-primary to-primary/80',
    check: 'text-primary',
    hoverBorder: 'hover:border-primary/40',
  },
  secondary: {
    header: 'from-secondary/10 to-secondary/5',
    iconWrap: 'from-secondary to-secondary/80',
    check: 'text-secondary',
    hoverBorder: 'hover:border-secondary/40',
  },
  accent: {
    header: 'from-accent/10 to-accent/5',
    iconWrap: 'from-accent to-accent/80',
    check: 'text-accent',
    hoverBorder: 'hover:border-accent/40',
  },
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const accent = accentForIndex(index)
  const s = accentStyles[accent]
  const Icon = resolveIconKey(product.icon)

  if (product.featured) {
    return (
      <Card
        className={cn(
          'overflow-hidden border-2 border-border/80 hover:shadow-xl transition-all duration-300 group bg-card md:col-span-2',
          s.hoverBorder,
        )}
      >
        <div className="md:flex md:items-stretch">
          <div className={cn('md:w-2/5 bg-gradient-to-br px-6 pt-6 pb-4 md:pb-6', s.header)}>
            <div
              className={cn(
                'w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform',
                s.iconWrap,
              )}
            >
              <Icon className="w-7 h-7 text-primary-foreground" />
            </div>
            <h3 className="text-xl font-bold mt-4 text-foreground">{product.name}</h3>
            {product.description && (
              <p className="text-sm text-muted-foreground mt-1.5">{product.description}</p>
            )}
          </div>
          <div className="px-6 pb-6 pt-4 md:pt-6 md:flex-1 md:flex md:items-center">
            {product.features.length > 0 ? (
              <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-2.5 text-sm text-muted-foreground w-full">
                {product.features.map((item, fi) => (
                  <li key={`${product.id}-f-${fi}`} className="flex items-center gap-3">
                    <CheckCircle2 className={cn('w-4 h-4 flex-shrink-0', s.check)} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">Contact us for capabilities and pricing.</p>
            )}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={cn(
        'overflow-hidden border-2 border-border/80 hover:shadow-xl transition-all duration-300 group bg-card',
        s.hoverBorder,
      )}
    >
      <div className={cn('bg-gradient-to-br px-6 pt-6 pb-4', s.header)}>
        <div
          className={cn(
            'w-14 h-14 bg-gradient-to-br rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform',
            s.iconWrap,
          )}
        >
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-bold mt-4 text-foreground">{product.name}</h3>
        {product.description && (
          <p className="text-sm text-muted-foreground mt-1.5">{product.description}</p>
        )}
      </div>
      <div className="px-6 pb-6 pt-4">
        {product.features.length > 0 ? (
          <ul className="space-y-2.5">
            {product.features.map((item, fi) => (
              <li key={`${product.id}-f-${fi}`} className="flex items-center gap-3 text-muted-foreground text-sm">
                <CheckCircle2 className={cn('w-4 h-4 flex-shrink-0', s.check)} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground">Contact us for more details.</p>
        )}
      </div>
    </Card>
  )
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/api/products')
        if (!res.ok) throw new Error('Failed to fetch')
        const data = await res.json()
        setProducts(Array.isArray(data) ? data : [])
      } catch (e) {
        console.error('Failed to fetch products:', e)
        setProducts([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        <section className="bg-gradient-to-br from-primary/5 via-background to-secondary/5 py-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Products</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Tools and platforms for researchers and communities—built with security and AI at the core.
            </p>
          </div>
        </section>

        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl font-bold mb-3">What We Build</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                The same professional presentation as our services—each product with clear highlights and outcomes.
              </p>
            </div>

            {loading ? (
              <div className="grid md:grid-cols-2 gap-8">
                {[...Array(4)].map((_, i) => (
                  <Card key={i} className="overflow-hidden border-2 p-6 space-y-4">
                    <Skeleton className="h-14 w-14 rounded-xl" />
                    <Skeleton className="h-7 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-20 w-full mt-4" />
                  </Card>
                ))}
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-2xl border border-dashed border-border bg-muted/20 max-w-3xl mx-auto">
                <p className="text-lg text-muted-foreground">
                  No products in the database yet. Add rows to the <code className="text-sm">products</code> table in
                  Supabase, or run <code className="text-sm">supabase/products_table.sql</code> and seed sample rows.
                </p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-8">
                {products.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
