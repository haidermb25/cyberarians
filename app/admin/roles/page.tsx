'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
import { Plus, Edit2, Trash2, Loader2, Shield } from 'lucide-react'

interface Role {
  id: string
  name: string
  description: string
}

export default function AdminRolesPage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingRole, setEditingRole] = useState<Role | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchRoles()
  }, [])

  async function fetchRoles() {
    try {
      const response = await fetch('/api/roles')
      if (!response.ok) throw new Error('Failed to fetch')
      const data = await response.json()
      setRoles(data)
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load roles',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleSubmit(data: Omit<Role, 'id'>) {
    try {
      if (editingRole) {
        const response = await fetch(`/api/roles/${editingRole.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('Failed to update')
        toast({ title: 'Success', description: 'Role updated successfully' })
      } else {
        const response = await fetch('/api/roles', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('Failed to create')
        toast({ title: 'Success', description: 'Role added successfully' })
      }
      fetchRoles()
      setModalOpen(false)
      setEditingRole(null)
    } catch (error) {
      toast({
        title: 'Error',
        description: editingRole ? 'Failed to update role' : 'Failed to add role',
        variant: 'destructive',
      })
    }
  }

  async function handleDelete() {
    if (!roleToDelete) return

    try {
      const response = await fetch(`/api/roles/${roleToDelete}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete')
      
      toast({ title: 'Success', description: 'Role deleted successfully' })
      fetchRoles()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete role',
        variant: 'destructive',
      })
    } finally {
      setDeleteDialogOpen(false)
      setRoleToDelete(null)
    }
  }

  return (
    <div className="p-8 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Roles Management</h1>
          <p className="text-muted-foreground">Manage community member roles</p>
        </div>
        <Button onClick={() => {
          setEditingRole(null)
          setModalOpen(true)
        }}>
          <Plus size={18} className="mr-2" />
          Add Role
        </Button>
      </div>

      <Card>
        {loading ? (
          <div className="p-6 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full" />
            ))}
          </div>
        ) : roles.length === 0 ? (
          <div className="p-12 text-center">
            <Shield className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground mb-4">No roles defined yet</p>
            <Button onClick={() => setModalOpen(true)}>
              <Plus size={18} className="mr-2" />
              Add First Role
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map(role => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-primary" />
                        {role.name}
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{role.description}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingRole(role)
                            setModalOpen(true)
                          }}
                        >
                          <Edit2 size={14} />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setRoleToDelete(role.id)
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

      <RoleFormModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSubmit={handleSubmit}
        initialData={editingRole || undefined}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Role</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this role? This action cannot be undone.
              Existing community members with this role will keep it, but it won't be available for new assignments.
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

interface RoleFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Role, 'id'>) => Promise<void>
  initialData?: Role
}

function RoleFormModal({ open, onOpenChange, onSubmit, initialData }: RoleFormModalProps) {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
  })

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
      })
    } else {
      setFormData({
        name: '',
        description: '',
      })
    }
  }, [initialData, open])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    try {
      await onSubmit({
        name: formData.name,
        description: formData.description,
      })
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Shield className="w-6 h-6 text-primary" />
            {initialData ? 'Edit Role' : 'Add New Role'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="name">Role Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., Moderator, Admin, Contributor"
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this role's purpose or responsibilities"
              rows={3}
              required
            />
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
              {loading ? 'Saving...' : 'Save Role'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
