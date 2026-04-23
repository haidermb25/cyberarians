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
import type { ServiceOffering } from '@/lib/data/services-catalog'

function parseHighlights(s: string): string[] {
  return s
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean)
}

export default function AdminServicesPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<ServiceOffering[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<ServiceOffering | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [slug, setSlug] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [highlightsText, setHighlightsText] = useState('')
  const [featured, setFeatured] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/services', { cache: 'no-store' })
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      toast({ title: 'Error', description: 'Could not load services', variant: 'destructive' })
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
    setSlug('')
    setTitle('')
    setDescription('')
    setHighlightsText('')
    setFeatured(false)
    setDialogOpen(true)
  }

  function openEdit(s: ServiceOffering) {
    setEditing(s)
    setSlug(s.id)
    setTitle(s.title)
    setDescription(s.description)
    setHighlightsText((s.highlights ?? []).join('\n'))
    setFeatured(Boolean(s.featured))
    setDialogOpen(true)
  }

  async function handleSave() {
    if (!title.trim()) {
      toast({ title: 'Title required', variant: 'destructive' })
      return
    }
    try {
      if (editing) {
        const res = await fetch('/api/admin/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editing.id,
            updates: {
              title: title.trim(),
              description: description.trim(),
              highlights: parseHighlights(highlightsText),
              featured,
            },
          }),
        })
        if (!res.ok) throw new Error()
        toast({ title: 'Service updated' })
      } else {
        const res = await fetch('/api/admin/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: slug.trim() || undefined,
            title: title.trim(),
            description: description.trim(),
            highlights: parseHighlights(highlightsText),
            featured,
          }),
        })
        if (!res.ok) throw new Error()
        toast({ title: 'Service created' })
      }
      setDialogOpen(false)
      load()
    } catch {
      toast({ title: 'Save failed — unique id / RLS', variant: 'destructive' })
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      const res = await fetch('/api/admin/services', {
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
          <h1 className="text-3xl font-bold tracking-tight">Services</h1>
          <p className="text-muted-foreground mt-1">
            Public page is still static layout; API drives future dynamic sections.{' '}
            <Link href="/services" className="text-primary inline-flex items-center gap-1 hover:underline">
              /services <ExternalLink className="h-3.5 w-3.5" />
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
            Add offering
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
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Bullets</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                    No rows. Run SQL migration and add offerings.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs">{s.id}</TableCell>
                    <TableCell className="font-medium max-w-[240px]">{s.title}</TableCell>
                    <TableCell>
                      {s.featured ? <Badge>Wide layout</Badge> : '—'}
                    </TableCell>
                    <TableCell className="text-sm">{s.highlights.length}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => openEdit(s)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => setDeleteId(s.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editing ? 'Edit service offering' : 'Add service offering'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {!editing && (
              <div className="space-y-2">
                <Label>Slug id (optional)</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. cloud" />
              </div>
            )}
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Highlights (one per line)</Label>
              <Textarea rows={6} value={highlightsText} onChange={(e) => setHighlightsText(e.target.value)} />
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="svc-feat" checked={featured} onCheckedChange={(v) => setFeatured(v === true)} />
              <Label htmlFor="svc-feat">Featured (wide card on site)</Label>
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
            <AlertDialogTitle>Delete this offering?</AlertDialogTitle>
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
