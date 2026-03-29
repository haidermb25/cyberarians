'use client'

import { useState, useEffect } from 'react'
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
import { Badge } from '@/components/ui/badge'
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
import { ResearcherFormModal } from '@/components/researcher-form-modal'
import { Plus, Edit2, Trash2 } from 'lucide-react'

interface Researcher {
  id: string
  name: string
  title: string
  expertise: string[]
  rating: number
  bio: string
  image: string
}

export default function AdminResearchersPage() {
  const { toast } = useToast()
  const [researchers, setResearchers] = useState<Researcher[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  useEffect(() => {
    fetchResearchers()
  }, [])

  async function fetchResearchers() {
    try {
      const response = await fetch('/api/researchers')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setResearchers(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load researchers',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleAddOrUpdate(data: Omit<Researcher, 'id'>) {
    try {
      if (editingId) {
        const response = await fetch('/api/admin/researchers', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, updates: data }),
        })
        if (!response.ok) throw new Error('Update failed')
        toast({
          title: 'Success',
          description: 'Researcher updated successfully',
        })
      } else {
        const response = await fetch('/api/admin/researchers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('Create failed')
        toast({
          title: 'Success',
          description: 'Researcher added successfully',
        })
      }
      setEditingId(null)
      fetchResearchers()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save researcher',
        variant: 'destructive',
      })
    }
  }

  async function handleDelete() {
    if (!deleteId) return

    try {
      const response = await fetch('/api/admin/researchers', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteId }),
      })
      if (!response.ok) throw new Error('Delete failed')
      toast({
        title: 'Success',
        description: 'Researcher deleted successfully',
      })
      setDeleteId(null)
      fetchResearchers()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete researcher',
        variant: 'destructive',
      })
    }
  }

  const editingResearcher = editingId ? researchers.find(r => r.id === editingId) : undefined

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Researchers</h1>
          <p className="text-muted-foreground">Add, edit, or remove research analysts</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormOpen(true)
          }}
        >
          <Plus size={18} className="mr-2" />
          Add Researcher
        </Button>
      </div>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : researchers.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground mb-4">No researchers yet</p>
            <Button onClick={() => setFormOpen(true)}>
              <Plus size={18} className="mr-2" />
              Create First Researcher
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Expertise</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead className="w-20">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {researchers.map(researcher => (
                  <TableRow key={researcher.id}>
                    <TableCell className="font-medium">{researcher.name}</TableCell>
                    <TableCell>{researcher.title}</TableCell>
                    <TableCell>
                      <div className="flex gap-1 flex-wrap">
                        {researcher.expertise.slice(0, 2).map(exp => (
                          <Badge key={exp} variant="secondary" className="text-xs">
                            {exp}
                          </Badge>
                        ))}
                        {researcher.expertise.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{researcher.expertise.length - 2}
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{researcher.rating}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingId(researcher.id)
                            setFormOpen(true)
                          }}
                        >
                          <Edit2 size={16} />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => setDeleteId(researcher.id)}
                        >
                          <Trash2 size={16} />
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

      <ResearcherFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleAddOrUpdate}
        initialData={editingResearcher}
      />

      <AlertDialog open={!!deleteId} onOpenChange={open => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Researcher</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this researcher? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex gap-3 justify-end">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
