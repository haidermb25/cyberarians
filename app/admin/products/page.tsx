'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { useToast } from '@/hooks/use-toast'
import { ExternalLink, Plus, Edit2, Trash2, RefreshCw } from 'lucide-react'
import type { Product } from '@/lib/types/product'

function parseFeatureLines(s: string): string[] {
  return s
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean)
}

export default function AdminProductsPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Product | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [featuresText, setFeaturesText] = useState('')
  const [icon, setIcon] = useState('')
  const [featured, setFeatured] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/products', { cache: 'no-store' })
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      toast({ title: 'Error', description: 'Could not load products', variant: 'destructive' })
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [toast])

  useEffect(() => {
    load()
  }, [load])

  function openCreate() {
    setEditing(null)
    setName('')
    setDescription('')
    setFeaturesText('')
    setIcon('')
    setFeatured(false)
    setDialogOpen(true)
  }

  function openEdit(p: Product) {
    setEditing(p)
    setName(p.name)
    setDescription(p.description ?? '')
    setFeaturesText((p.features ?? []).join('\n'))
    setIcon(p.icon ?? '')
    setFeatured(p.featured)
    setDialogOpen(true)
  }

  async function handleSave() {
    if (!name.trim()) {
      toast({ title: 'Name required', variant: 'destructive' })
      return
    }
    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      features: parseFeatureLines(featuresText),
      icon: icon.trim() || null,
      featured,
    }
    try {
      if (editing) {
        const res = await fetch('/api/admin/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, updates: payload }),
        })
        if (!res.ok) throw new Error()
        toast({ title: 'Product updated' })
      } else {
        const res = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast({ title: 'Product created' })
      }
      setDialogOpen(false)
      load()
    } catch {
      toast({ title: 'Save failed', variant: 'destructive' })
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      const res = await fetch('/api/admin/products', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteId }),
      })
      if (!res.ok) throw new Error()
      toast({ title: 'Deleted' })
      setDeleteId(null)
      load()
    } catch {
      toast({ title: 'Delete failed', variant: 'destructive' })
    }
  }

  return (
    <div className="p-6 sm:p-8 space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-1">
            Manage catalog in Supabase. Public:{' '}
            <Link href="/products" className="text-primary inline-flex items-center gap-1 hover:underline">
              /products <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => load()} disabled={loading}>
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
          <Button size="sm" onClick={openCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Add product
          </Button>
        </div>
      </div>

      <Card>
        {loading ? (
          <div className="p-6 space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Featured</TableHead>
                  <TableHead>Icon</TableHead>
                  <TableHead>Highlights</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                      No products. Add one or run SQL in Supabase.
                    </TableCell>
                  </TableRow>
                ) : (
                  items.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium max-w-[200px]">{p.name}</TableCell>
                      <TableCell>{p.featured ? <Badge>Featured</Badge> : '—'}</TableCell>
                      <TableCell className="text-sm">{p.icon ?? '—'}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {p.features?.length ?? 0} items
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => openEdit(p)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                          <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => setDeleteId(p.id)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit product' : 'Add product'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="p-name">Name</Label>
              <Input id="p-name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-desc">Description</Label>
              <Textarea id="p-desc" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-feat">Highlights (one per line)</Label>
              <Textarea id="p-feat" rows={5} value={featuresText} onChange={(e) => setFeaturesText(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="p-icon">Icon key (e.g. package, brain)</Label>
              <Input id="p-icon" value={icon} onChange={(e) => setIcon(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="p-feat-toggle" checked={featured} onCheckedChange={(v) => setFeatured(v === true)} />
              <Label htmlFor="p-feat-toggle">Featured wide card</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <AlertDialog open={!!deleteId} onOpenChange={(o) => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-2">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
