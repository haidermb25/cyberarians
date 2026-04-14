'use client'

import Link from 'next/link'
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useToast } from '@/hooks/use-toast'
import { Skeleton } from '@/components/ui/skeleton'
import { CommunityFormModal } from '@/components/community-form-modal'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react'

interface CommunityMember {
  id: string
  name: string
  role: string
}

interface Community {
  id: string
  name: string
  description: string
  members: CommunityMember[]
}

interface Researcher {
  id: string
  name: string
  title: string
  expertise: string[]
  rating: number
  bio: string
  image: string
}

interface Person {
  id: string
  name: string
  email: string
  phone?: string
  organization?: string
  role?: string
}

interface Role {
  id: string
  name: string
  description: string
}

export default function AdminCommunitiesPage() {
  const { toast } = useToast()
  const [communities, setCommunities] = useState<Community[]>([])
  const [researchers, setResearchers] = useState<Researcher[]>([])
  const [people, setPeople] = useState<Person[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null)
  const [addingMember, setAddingMember] = useState(false)
  const [newMemberId, setNewMemberId] = useState('')
  const [newMemberRole, setNewMemberRole] = useState('Member')

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    setNewMemberId('')
  }, [selectedCommunityId])

  async function fetchData() {
    try {
      const [communitiesRes, researchersRes, peopleRes, rolesRes] = await Promise.all([
        fetch('/api/communities'),
        fetch('/api/researchers'),
        fetch('/api/people'),
        fetch('/api/roles'),
      ])
      if (!communitiesRes.ok || !researchersRes.ok || !peopleRes.ok || !rolesRes.ok) throw new Error('Fetch failed')
      const [communitiesData, researchersData, peopleData, rolesData] = await Promise.all([
        communitiesRes.json(),
        researchersRes.json(),
        peopleRes.json(),
        rolesRes.json(),
      ])
      setCommunities(communitiesData)
      setResearchers(researchersData)
      setPeople(peopleData)
      setRoles(rolesData)
      if (communitiesData.length > 0 && !selectedCommunityId) {
        setSelectedCommunityId(communitiesData[0].id)
      }
      // Set default role to first available role
      if (rolesData.length > 0) {
        setNewMemberRole(rolesData[0].name)
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load data',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  async function handleAddOrUpdate(data: Omit<Community, 'id'>) {
    try {
      if (editingId) {
        const response = await fetch('/api/admin/communities', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, updates: data }),
        })
        if (!response.ok) throw new Error('Update failed')
        toast({
          title: 'Success',
          description: 'Community updated successfully',
        })
      } else {
        const response = await fetch('/api/admin/communities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
        if (!response.ok) throw new Error('Create failed')
        toast({
          title: 'Success',
          description: 'Community added successfully',
        })
      }
      setEditingId(null)
      fetchData()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to save community',
        variant: 'destructive',
      })
    }
  }

  async function handleDelete() {
    if (!deleteId) return

    try {
      const response = await fetch('/api/admin/communities', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: deleteId }),
      })
      if (!response.ok) throw new Error('Delete failed')
      toast({
        title: 'Success',
        description: 'Community deleted successfully',
      })
      setDeleteId(null)
      setSelectedCommunityId(null)
      fetchData()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete community',
        variant: 'destructive',
      })
    }
  }

  async function handleAddMember() {
    if (!selectedCommunityId || !newMemberId) return

    setAddingMember(true)
    try {
      const idKey = newMemberId
      // Select values are strings; Supabase may return numeric ids — compare as strings
      const researcher = researchers.find(r => String(r.id) === idKey)
      const person = people.find(p => String(p.id) === idKey)
      
      if (!researcher && !person) {
        toast({
          title: 'Error',
          description: 'Person not found',
          variant: 'destructive',
        })
        return
      }

      const member: CommunityMember = {
        id: newMemberId,
        name: researcher?.name || person?.name || 'Unknown',
        role: newMemberRole,
      }

      const selectedCommunity = communities.find(c => String(c.id) === String(selectedCommunityId))
      if (!selectedCommunity) throw new Error('Community not found')

      // Check if already a member
      if (selectedCommunity.members.some(m => String(m.id) === idKey)) {
        toast({
          title: 'Error',
          description: 'This person is already a member',
          variant: 'destructive',
        })
        setAddingMember(false)
        return
      }

      const updated = { ...selectedCommunity, members: [...selectedCommunity.members, member] }

      const response = await fetch('/api/admin/communities', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedCommunityId, updates: updated }),
      })
      if (!response.ok) throw new Error('Add member failed')

      toast({
        title: 'Success',
        description: 'Member added successfully',
      })
      setNewMemberId('')
      setNewMemberRole('Member')
      fetchData()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to add member',
        variant: 'destructive',
      })
    } finally {
      setAddingMember(false)
    }
  }

  async function handleDeleteMember(memberId: string) {
    if (!selectedCommunityId) return

    try {
      const selectedCommunity = communities.find(c => String(c.id) === String(selectedCommunityId))
      if (!selectedCommunity) throw new Error('Community not found')

      const updated = {
        ...selectedCommunity,
        members: selectedCommunity.members.filter(m => String(m.id) !== String(memberId)),
      }

      const response = await fetch('/api/admin/communities', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedCommunityId, updates: updated }),
      })
      if (!response.ok) throw new Error('Delete member failed')

      toast({
        title: 'Success',
        description: 'Member removed successfully',
      })
      fetchData()
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to remove member',
        variant: 'destructive',
      })
    }
  }

  const editingCommunity = editingId
    ? communities.find(c => String(c.id) === String(editingId))
    : undefined
  const selectedCommunity = selectedCommunityId
    ? communities.find(c => String(c.id) === String(selectedCommunityId))
    : null

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Communities</h1>
          <p className="text-muted-foreground">Create and manage research communities</p>
        </div>
        <Button
          onClick={() => {
            setEditingId(null)
            setFormOpen(true)
          }}
        >
          <Plus size={18} className="mr-2" />
          Add Community
        </Button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <Skeleton key={i} className="h-16 w-full" />
          ))}
        </div>
      ) : communities.length === 0 ? (
        <Card className="p-12 text-center">
          <p className="text-muted-foreground mb-4">No communities yet</p>
          <Button onClick={() => setFormOpen(true)}>
            <Plus size={18} className="mr-2" />
            Create First Community
          </Button>
        </Card>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Communities List */}
          <Card className="overflow-hidden">
            <div className="p-4 border-b border-border">
              <h2 className="font-semibold">Communities</h2>
            </div>
            <div className="divide-y max-h-96 overflow-y-auto">
              {communities.map(community => (
                <button
                  key={String(community.id)}
                  onClick={() => setSelectedCommunityId(String(community.id))}
                  className={`w-full text-left p-3 hover:bg-muted transition-colors ${
                    String(selectedCommunityId) === String(community.id)
                      ? 'bg-primary/10 border-l-2 border-primary'
                      : ''
                  }`}
                >
                  <p className="font-medium text-sm">{community.name}</p>
                  <p className="text-xs text-muted-foreground">{community.members.length} members</p>
                </button>
              ))}
            </div>
          </Card>

          {/* Community Details */}
          <div className="lg:col-span-2 space-y-4">
            {selectedCommunity && (
              <>
                <Card className="p-6 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-bold">{selectedCommunity.name}</h2>
                      <p className="text-muted-foreground mt-1">{selectedCommunity.description}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setEditingId(selectedCommunity.id)
                          setFormOpen(true)
                        }}
                      >
                        <Edit2 size={16} />
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => setDeleteId(selectedCommunity.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 space-y-4">
                  <h3 className="font-semibold">Add Member</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="member">Select Person</Label>
                      <select
                        id="member"
                        value={newMemberId}
                        onChange={e => setNewMemberId(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        <option value="">Choose a person...</option>
                        <optgroup label="Researchers">
                          {researchers
                            .filter(
                              r =>
                                !selectedCommunity.members.some(m => String(m.id) === String(r.id))
                            )
                            .map(r => (
                              <option key={String(r.id)} value={String(r.id)}>
                                {r.name} - {r.title}
                              </option>
                            ))}
                        </optgroup>
                        <optgroup label="People">
                          {people
                            .filter(
                              p =>
                                !selectedCommunity.members.some(m => String(m.id) === String(p.id))
                            )
                            .map(p => (
                              <option key={String(p.id)} value={String(p.id)}>
                                {p.name} {p.organization ? `- ${p.organization}` : ''}
                              </option>
                            ))}
                        </optgroup>
                      </select>
                    </div>
                    <div>
                      <Label htmlFor="role">Role</Label>
                      <select
                        id="role"
                        value={newMemberRole}
                        onChange={e => setNewMemberRole(e.target.value)}
                        className="w-full px-3 py-2 border border-input rounded-md bg-background"
                      >
                        {roles.map(role => (
                          <option key={role.id} value={role.name}>
                            {role.name}
                          </option>
                        ))}
                      </select>
                      <p className="text-xs text-muted-foreground mt-1">
                        <Link href="/admin/roles" className="text-primary hover:underline">
                          Manage roles
                        </Link>
                      </p>
                    </div>
                    <Button
                      onClick={handleAddMember}
                      disabled={addingMember || !newMemberId}
                      className="w-full"
                    >
                      {addingMember && <Loader2 size={18} className="mr-2 animate-spin" />}
                      Add Member
                    </Button>
                  </div>
                </Card>

                <Card className="overflow-hidden">
                  <div className="p-4 border-b border-border">
                    <h3 className="font-semibold">Members</h3>
                  </div>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead className="w-12">Action</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {selectedCommunity.members.map(member => (
                          <TableRow key={member.id}>
                            <TableCell className="font-medium">{member.name}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleDeleteMember(member.id)}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </Card>
              </>
            )}
          </div>
        </div>
      )}

      <CommunityFormModal
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleAddOrUpdate}
        initialData={editingCommunity}
      />

      <AlertDialog open={!!deleteId} onOpenChange={open => !open && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Community</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this community? This action cannot be undone.
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
