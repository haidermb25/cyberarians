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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
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
import type { Session } from '@/lib/types/session'

function formatWhen(iso: string | null) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' })
  } catch {
    return iso
  }
}

function toDatetimeLocalValue(iso: string | null): string {
  if (!iso) return ''
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return ''
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`
}

function fromDatetimeLocalValue(s: string): string | null {
  if (!s.trim()) return null
  const t = new Date(s).getTime()
  if (Number.isNaN(t)) return null
  return new Date(s).toISOString()
}

export default function AdminSessionsPage() {
  const { toast } = useToast()
  const [items, setItems] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editing, setEditing] = useState<Session | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [working, setWorking] = useState(false)
  const [location, setLocation] = useState('')
  const [format, setFormat] = useState('online')
  const [facilitator, setFacilitator] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('')
  const [sessionType, setSessionType] = useState('')

  const load = useCallback(async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/admin/sessions', { cache: 'no-store' })
      if (!res.ok) throw new Error('fetch failed')
      const data = await res.json()
      setItems(Array.isArray(data) ? data : [])
    } catch {
      toast({ title: 'Error', description: 'Could not load sessions', variant: 'destructive' })
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
    setStartsAt('')
    setEndsAt('')
    setWorking(false)
    setLocation('')
    setFormat('online')
    setFacilitator('')
    setMaxParticipants('')
    setSessionType('')
    setDialogOpen(true)
  }

  function openEdit(s: Session) {
    setEditing(s)
    setName(s.name)
    setDescription(s.description ?? '')
    setStartsAt(toDatetimeLocalValue(s.startsAt))
    setEndsAt(toDatetimeLocalValue(s.endsAt))
    setWorking(s.working)
    setLocation(s.location ?? '')
    setFormat(s.format ?? 'online')
    setFacilitator(s.facilitator ?? '')
    setMaxParticipants(s.maxParticipants != null ? String(s.maxParticipants) : '')
    setSessionType(s.sessionType ?? '')
    setDialogOpen(true)
  }

  async function handleSave() {
    if (!name.trim()) {
      toast({ title: 'Name required', variant: 'destructive' })
      return
    }
    const maxP = maxParticipants.trim() === '' ? null : Number(maxParticipants)
    const payload = {
      name: name.trim(),
      description: description.trim() || null,
      startsAt: fromDatetimeLocalValue(startsAt),
      endsAt: fromDatetimeLocalValue(endsAt),
      working,
      location: location.trim() || null,
      format: format || 'online',
      facilitator: facilitator.trim() || null,
      maxParticipants: maxP != null && !Number.isNaN(maxP) ? maxP : null,
      sessionType: sessionType.trim() || null,
    }
    try {
      if (editing) {
        const res = await fetch('/api/admin/sessions', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editing.id, updates: payload }),
        })
        if (!res.ok) throw new Error()
        toast({ title: 'Session updated' })
      } else {
        const res = await fetch('/api/admin/sessions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        })
        if (!res.ok) throw new Error()
        toast({ title: 'Session created' })
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
      const res = await fetch('/api/admin/sessions', {
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
          <h1 className="text-3xl font-bold tracking-tight">Sessions</h1>
          <p className="text-muted-foreground mt-1">
            Public:{' '}
            <Link href="/sessions" className="text-primary inline-flex items-center gap-1 hover:underline">
              /sessions <ExternalLink className="h-3.5 w-3.5" />
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
            Add session
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
                <TableHead>Name</TableHead>
                <TableHead>When</TableHead>
                <TableHead>Working</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Format</TableHead>
                <TableHead className="w-[100px]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center text-muted-foreground py-12">
                    No sessions in database. Add one here.
                  </TableCell>
                </TableRow>
              ) : (
                items.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-medium max-w-[180px]">{s.name}</TableCell>
                    <TableCell className="text-sm whitespace-nowrap">{formatWhen(s.startsAt)}</TableCell>
                    <TableCell>
                      {s.working ? <Badge className="bg-emerald-600">Live</Badge> : <span className="text-muted-foreground text-sm">No</span>}
                    </TableCell>
                    <TableCell className="text-sm">{s.sessionType ?? '—'}</TableCell>
                    <TableCell className="text-sm">{s.format ?? '—'}</TableCell>
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
            <DialogTitle>{editing ? 'Edit session' : 'Add session'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3 py-2">
            <div className="space-y-2">
              <Label>Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label>Starts</Label>
                <Input type="datetime-local" value={startsAt} onChange={(e) => setStartsAt(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Ends</Label>
                <Input type="datetime-local" value={endsAt} onChange={(e) => setEndsAt(e.target.value)} />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Checkbox id="sess-work" checked={working} onCheckedChange={(v) => setWorking(v === true)} />
              <Label htmlFor="sess-work">Working / live now</Label>
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Format</Label>
              <Select value={format} onValueChange={setFormat}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">online</SelectItem>
                  <SelectItem value="in_person">in_person</SelectItem>
                  <SelectItem value="hybrid">hybrid</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Session type</Label>
              <Input value={sessionType} onChange={(e) => setSessionType(e.target.value)} placeholder="Workshop, Training…" />
            </div>
            <div className="space-y-2">
              <Label>Facilitator</Label>
              <Input value={facilitator} onChange={(e) => setFacilitator(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Max participants</Label>
              <Input
                type="number"
                min={0}
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
              />
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
            <AlertDialogTitle>Delete session?</AlertDialogTitle>
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
