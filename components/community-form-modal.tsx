'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Loader2, Plus, X, Info, Settings, Shield, MapPin, Tag, User } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { uploadAdminImage } from '@/lib/storage'

interface CommunityMember {
  id: string
  name: string
  role: string
}

interface Community {
  id: string
  name: string
  description: string
  category: string
  logo?: string | null
  privacy: 'public' | 'private'
  rules?: string
  location?: string
  tags: string[]
  adminName: string
  adminEmail: string
  members: CommunityMember[]
}

interface CommunityFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Community, 'id'>) => Promise<void>
  initialData?: Community
}

export function CommunityFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: CommunityFormModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [pendingLogoFile, setPendingLogoFile] = useState<File | null>(null)
  const [localLogoPreview, setLocalLogoPreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    logo: '',
    privacy: 'public' as 'public' | 'private',
    rules: '',
    location: '',
    tags: '',
    adminName: '',
    adminEmail: '',
  })

  useEffect(() => {
    setLocalLogoPreview(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setPendingLogoFile(null)

    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
        category: initialData.category || '',
        logo: initialData.logo || '',
        privacy: initialData.privacy || 'public',
        rules: initialData.rules || '',
        location: initialData.location || '',
        tags: initialData.tags?.join(', ') || '',
        adminName: initialData.adminName || '',
        adminEmail: initialData.adminEmail || '',
      })
    } else {
      setFormData({
        name: '',
        description: '',
        category: '',
        logo: '',
        privacy: 'public',
        rules: '',
        location: '',
        tags: '',
        adminName: '',
        adminEmail: '',
      })
    }
  }, [initialData, open])

  function handleLogoSelected(file?: File) {
    if (!file) return

    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file',
        description: 'Please select an image file.',
        variant: 'destructive',
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload an image smaller than 5MB.',
        variant: 'destructive',
      })
      return
    }

    setLocalLogoPreview(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    setPendingLogoFile(file)
  }

  function clearLogo() {
    setLocalLogoPreview(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setPendingLogoFile(null)
    setFormData(prev => ({ ...prev, logo: '' }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)

    try {
      let logo: string | null | undefined
      if (pendingLogoFile) {
        try {
          logo = await uploadAdminImage(pendingLogoFile, 'community')
        } catch (error) {
          toast({
            title: 'Upload failed',
            description: error instanceof Error ? error.message : 'Failed to upload image.',
            variant: 'destructive',
          })
          return
        }
      } else if (formData.logo.trim() !== '') {
        logo = formData.logo
      } else if (initialData) {
        logo = null
      } else {
        logo = undefined
      }

      await onSubmit({
        name: formData.name,
        description: formData.description,
        category: formData.category,
        logo,
        privacy: formData.privacy,
        rules: formData.rules || undefined,
        location: formData.location || undefined,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        adminName: formData.adminName,
        adminEmail: formData.adminEmail,
        members: initialData?.members || [],
      })

      setLocalLogoPreview(prev => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
      setPendingLogoFile(null)
      setFormData(prev => ({ ...prev, logo: typeof logo === 'string' ? logo : '' }))
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw]! w-[80vw] h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">{initialData ? 'Edit Community' : 'Create New Community'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <Tabs defaultValue="basic" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <Info className="w-4 h-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Admin Info
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto pr-2">
              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Label htmlFor="name" className="text-base">Community Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="AI & Machine Learning Research"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="description" className="text-base">Description / Purpose *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={e => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the community's focus, goals, and what members can expect..."
                      rows={5}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="category" className="text-base">Category / Topic *</Label>
                    <Select 
                      value={formData.category} 
                      onValueChange={value => setFormData({ ...formData, category: value })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="artificial-intelligence">Artificial Intelligence</SelectItem>
                        <SelectItem value="biotechnology">Biotechnology</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="medicine">Medicine</SelectItem>
                        <SelectItem value="engineering">Engineering</SelectItem>
                        <SelectItem value="mathematics">Mathematics</SelectItem>
                        <SelectItem value="social-sciences">Social Sciences</SelectItem>
                        <SelectItem value="environmental">Environmental Science</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="privacy" className="text-base">Privacy Setting *</Label>
                    <Select 
                      value={formData.privacy} 
                      onValueChange={value => setFormData({ ...formData, privacy: value as 'public' | 'private' })}
                    >
                      <SelectTrigger className="mt-2">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">🌐 Public - Anyone can view</SelectItem>
                        <SelectItem value="private">🔒 Private - Members only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="col-span-2 space-y-3">
                    <Label htmlFor="logo" className="text-base">Logo / Image</Label>
                    <Input
                      id="logo"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handleLogoSelected(e.target.files?.[0])
                        e.currentTarget.value = ''
                      }}
                      className="mt-2"
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Optional: JPG, PNG, or WebP up to 5MB. Logo is uploaded to Cloudinary when you save.
                    </p>
                    {(localLogoPreview || formData.logo) && (
                      <div className="space-y-2">
                        <img
                          src={localLogoPreview || formData.logo}
                          alt="Community logo preview"
                          className="h-24 w-24 rounded-md object-cover border"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={clearLogo}
                          disabled={loading}
                        >
                          Remove Logo
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="tags" className="text-base">Tags / Keywords</Label>
                    <Input
                      id="tags"
                      value={formData.tags}
                      onChange={e => setFormData({ ...formData, tags: e.target.value })}
                      placeholder="machine learning, deep learning, neural networks, AI"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Comma-separated keywords for better discoverability</p>
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="location" className="text-base">Location</Label>
                    <div className="flex gap-2 items-center">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <Input
                        id="location"
                        value={formData.location}
                        onChange={e => setFormData({ ...formData, location: e.target.value })}
                        placeholder="Global, USA, Europe, or specific city"
                        className="mt-2 flex-1"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">Optional: Geographic focus or location</p>
                  </div>
                </div>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings" className="space-y-6 mt-0">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Define community guidelines and rules</p>
                </div>

                <Card className="p-6 bg-muted/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Shield className="w-5 h-5 text-primary" />
                    <h3 className="text-lg font-semibold">Community Rules & Guidelines</h3>
                  </div>
                  <Textarea
                    id="rules"
                    value={formData.rules}
                    onChange={e => setFormData({ ...formData, rules: e.target.value })}
                    placeholder="Example:&#10;1. Be respectful and professional&#10;2. Share knowledge freely&#10;3. No spam or self-promotion&#10;4. Cite sources appropriately&#10;5. Respect intellectual property"
                    rows={12}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Define clear rules and expectations for community members
                  </p>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h3 className="text-lg font-semibold mb-3">Privacy Setting Details</h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <div className="flex gap-3">
                      <div className="text-2xl">🌐</div>
                      <div>
                        <p className="font-semibold text-foreground">Public Community</p>
                        <p>Anyone can view the community, see members, and read content. Great for open collaboration.</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <div className="text-2xl">🔒</div>
                      <div>
                        <p className="font-semibold text-foreground">Private Community</p>
                        <p>Only members can view and participate. Ideal for focused research groups or sensitive topics.</p>
                      </div>
                    </div>
                  </div>
                </Card>
              </TabsContent>

              {/* Admin Info Tab */}
              <TabsContent value="admin" className="space-y-6 mt-0">
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground">Community administrator contact information</p>
                </div>

                <Card className="p-6 bg-muted/30">
                  <div className="space-y-6">
                    <div>
                      <Label htmlFor="adminName" className="text-base">Admin / Owner Name *</Label>
                      <Input
                        id="adminName"
                        value={formData.adminName}
                        onChange={e => setFormData({ ...formData, adminName: e.target.value })}
                        placeholder="Dr. Sarah Chen"
                        className="mt-2"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="adminEmail" className="text-base">Admin Email *</Label>
                      <Input
                        id="adminEmail"
                        type="email"
                        value={formData.adminEmail}
                        onChange={e => setFormData({ ...formData, adminEmail: e.target.value })}
                        placeholder="admin@university.edu"
                        className="mt-2"
                        required
                      />
                      <p className="text-xs text-muted-foreground mt-1">
                        This email will be used for community management and member inquiries
                      </p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 bg-primary/5 border-primary/20">
                  <h3 className="text-lg font-semibold mb-3">Administrator Responsibilities</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Moderate community discussions and enforce rules</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Approve or decline membership requests (for private communities)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Manage member roles and permissions</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Keep community information and rules up to date</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-primary">•</span>
                      <span>Respond to member questions and concerns</span>
                    </li>
                  </ul>
                </Card>
              </TabsContent>
            </div>
          </Tabs>

          {/* Form Actions - Fixed at bottom */}
          <div className="flex gap-3 justify-end pt-4 mt-4 border-t">
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
              {loading ? 'Saving...' : initialData ? 'Save Changes' : 'Create Community'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
