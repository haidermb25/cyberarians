export interface Product {
  id: string
  name: string
  description: string | null
  features: string[]
  /** Lucide icon key, e.g. package, brain, globe */
  icon: string | null
  /** Wider card spanning two columns on md+ */
  featured: boolean
}
