'use client'

import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import type { Engineer } from '@/lib/data/engineers'

function parseSkills(s: string): string[] {
  return s
    .split(/\r?\n/)
    .map((x) => x.trim())
    .filter(Boolean)
}

export default function AdminEngineersPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<Engineer[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Engineer | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [slug, setSlug] = useState('')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [image, setImage] = useState('')
  const [location, setLocation] = useState('')
  const [experience, setExperience] = useState('')
  const [focus, setFocus] = useState('')
  const [summary, setSummary] = useState('')
  const [skillsText, setSkillsText] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [github, setGithub] = useState('')
  const [email, setEmail] = useState('')
  const [website, setWebsite] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/engineers', { cache: 'no-store' })
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      toast({ title: 'Error', description: 'Could not load engineers', variant: 'destructive' })
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
    setName('')
    setRole('')
    setImage('')
    setLocation('')
    setExperience('')
    setFocus('')
    setSummary('')
    setSkillsText('')
    setLinkedin('')
    setGithub('')
    setEmail('')
    setWebsite('')
    setDialogOpen(true)
  }

  function openEdit(e: Engineer) {
    setEditing(e)
    setSlug(e.id)
    setName(e.name)
    setRole(e.role)
    setImage(e.image)
    setLocation(e.location)
    setExperience(e.experience)
    setFocus(e.focus)
    setSummary(e.summary)
    setSkillsText((e.skills ?? []).join('\n'))
    setLinkedin(e.linkedin ?? '')
    setGithub(e.github ?? '')
    setEmail(e.email ?? '')
    setWebsite(e.website ?? '')
    setDialogOpen(true)
  }

  async function handleSave() {
    if (!name.trim() || !role.trim()) {
      toast({ title: 'Name and role are required', variant: 'destructive' })
      return
    }
    const body: Record<string, unknown> = {
      name: name.trim(),
      role: role.trim(),
      image: image.trim() || '/engineers/placeholder.png',
      location: location.trim(),
      experience: experience.trim(),
      focus: focus.trim(),
      summary: summary.trim(),
      skills: parseSkills(skillsText),
      linkedin: linkedin.trim() || undefined,
      github: github.trim() || undefined,
      email: email.trim() || undefined,
      website: website.trim() || undefined,
    }
    if (!editing && slug.trim()) body.id = slug.trim()

    try {
      if (editing) {
        const res = await fetch('/api/admin/engineers', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, updates: body }),
        })
        if (!res.ok) throw new Error()
        toast({ title: 'Engineer updated' })
      } else {
        const res = await fetch('/api/admin/engineers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!res.ok) throw new Error()
        toast({ title: 'Engineer created' })
      }
      setDialogOpen(false)
      load()
    } catch {
      toast({ title: 'Save failed — check id unique & Supabase RLS', variant: 'destructive' })
    }
  }

  async function handleDelete() {
    if (!deleteId) return
    try {
      const res = await fetch('/api/admin/engineers', {
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
          <h1 className="text-3xl font-bold tracking-tight">Engineers</h1>
          <p className="text-muted-foreground mt-1">
            Public:{' '}
            <Link href="/engineers" className="text-primary inline-flex items-center gap-1 hover:underline">
              /engineers <ExternalLink className="h-3.5 w-3.5" />
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
            Add engineer
          </Button>
        </div>
      </div>

      <Card className="overflow-x-auto">
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
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Location</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-muted-foreground py-12">
                    No rows. Run SQL migration and add engineers.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((e) => (
                  <TableRow key={e.id}>
                    <TableCell className="font-mono text-xs">{e.id}</TableCell>
                    <TableCell className="font-medium">{e.name}</TableCell>
                    <TableCell className="max-w-[200px] text-sm">{e.role}</TableCell>
                    <TableCell>{e.location}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Button size="icon" variant="outline" className="h-8 w-8" onClick={() => openEdit(e)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="destructive" className="h-8 w-8" onClick={() => setDeleteId(e.id)}>
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
            <DialogTitle>{editing ? 'Edit engineer' : 'Add engineer'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            {!editing && (
              <div className="space-y-2">
                <Label>Slug id (optional, e.g. ali-haider)</Label>
                <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="Auto from name if empty" />
              </div>
            )}
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Role</Label>
              <Input value={role} onChange={(e) => setRole(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Image path</Label>
              <Input value={image} onChange={(e) => setImage(e.target.value)} placeholder="/engineers/photo.png" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-2">
                <Label>Location</Label>
                <Input value={location} onChange={(e) => setLocation(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Experience</Label>
                <Input value={experience} onChange={(e) => setExperience(e.target.value)} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Focus</Label>
              <Input value={focus} onChange={(e) => setFocus(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Summary</Label>
              <Textarea rows={3} value={summary} onChange={(e) => setSummary(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Skills (one per line)</Label>
              <Textarea rows={4} value={skillsText} onChange={(e) => setSkillsText(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>LinkedIn</Label>
              <Input value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>GitHub</Label>
              <Input value={github} onChange={(e) => setGithub(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Website</Label>
              <Input value={website} onChange={(e) => setWebsite(e.target.value)} />
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
            <AlertDialogTitle>Delete engineer?</AlertDialogTitle>
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
