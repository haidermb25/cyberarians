'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
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
import { Skeleton } from '@/components/ui/skeleton'
import { Plus, Edit2, Trash2, Loader2, Mail, Phone, Building } from 'lucide-react'

interface Person {
  id: string
  name: string
  email: string
  phone?: string
  organization?: string
  role?: string
}

export default function AdminPeoplePage() {
  const [people, setPeople] = useState<Person[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingPerson, setEditingPerson] = useState<Person | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [personToDelete, setPersonToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchPeople()
  }, [])

  async function fetchPeople() {
    try {
      const response = await fetch('/api/people')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setPeople(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load people',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(data: Omit<Person, 'id'>) {
    try {
      if (editingPerson) {
        const response = await fetch(`/api/people/${editingPerson.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('Failed to update')
        toast({ title: 'Success', description: 'Person updated successfully' })
      } else {
        const response = await fetch('/api/people', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('Failed to create')
        toast({ title: 'Success', description: 'Person added successfully' })
      }
      fetchPeople()
      setModalOpen(false)
      setEditingPerson(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: editingPerson ? 'Failed to update person' : 'Failed to add person',
        variant: 'destructive',
      })
    }
  }

  async function handleDelete() {
    if (!personToDelete) return

    try {
      const response = await fetch(`/api/people/${personToDelete}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete')
      
      toast({ title: 'Success', description: 'Person deleted successfully' })
      fetchPeople()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete person',
        variant: 'destructive',
      })
    } finally {
      setDeleteDialogOpen(false)
      setPersonToDelete(null)
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">People Management</h1>
          <p className="text-muted-foreground">Manage general people who can be added to communities</p>
        </div>
        <Button onClick={() => {
          setEditingPerson(null)
          setModalOpen(true)
        }}>
          <Plus size={18} className="mr-2" />
          Add Person
        </Button>
      </div>

      <Card>
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : people.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No people added yet</p>
            <Button onClick={() => setModalOpen(true)}>
              <Plus size={18} className="mr-2" />
              Add First Person
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {people.map(person => (
                  <TableRow key={person.id}>
                    <TableCell className="font-medium">{person.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-3 h-3 text-muted-foreground" />
                        {person.email}
                      </div>
                    </TableCell>
                    <TableCell>
                      {person.phone && (
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-3 h-3 text-muted-foreground" />
                          {person.phone}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {person.organization && (
                        <div className="flex items-center gap-2 text-sm">
                          <Building className="w-3 h-3 text-muted-foreground" />
                          {person.organization}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{person.role || '-'}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingPerson(person)
                            setModalOpen(true)
                          }}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setPersonToDelete(person.id)
                            setDeleteDialogOpen(true)
                          }}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </Card>

      <PersonFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleSubmit}
        initialData={editingPerson || undefined}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Person</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this person? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex justify-end gap-3">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

interface PersonFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Person, 'id'>) => Promise<void>
  initialData?: Person
}

function PersonFormModal({ open, onOpenChange, onSubmit, initialData }: PersonFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        email: initialData.email,
        phone: initialData.phone || '',
        organization: initialData.organization || '',
        role: initialData.role || '',
      })
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        organization: '',
        role: '',
      })
    }
  }, [initialData, open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await onSubmit({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        organization: formData.organization || undefined,
        role: formData.role || undefined,
      })
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {initialData ? 'Edit Person' : 'Add New Person'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <Label htmlFor="name">Full Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                placeholder="john.doe@example.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <Label htmlFor="organization">Organization</Label>
              <Input
                id="organization"
                value={formData.organization}
                onChange={e => setFormData({ ...formData, organization: e.target.value })}
                placeholder="Company or Institution"
              />
            </div>

            <div>
              <Label htmlFor="role">Role/Title</Label>
              <Input
                id="role"
                value={formData.role}
                onChange={e => setFormData({ ...formData, role: e.target.value })}
                placeholder="e.g., Research Assistant, Student"
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 size={18} className="mr-2 animate-spin" />}
              {loading ? 'Saving...' : 'Save Person'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
