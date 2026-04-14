'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Loader2, Plus, X, User, GraduationCap, BookOpen, Award, Link as LinkIcon } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { uploadAdminImage } from '@/lib/storage'

interface Education {
  degree: string
  institution: string
  year: string
}

interface Links {
  orcid?: string
  googleScholar?: string
  linkedin?: string
  website?: string
}

interface Researcher {
  id: string
  name: string
  title: string
  affiliation: string
  email: string
  phone?: string
  expertise: string[]
  rating: number
  bio: string
  image: string
  publications?: string[]
  projects?: string[]
  awards?: string[]
  education?: Education[]
  links?: Links
}

interface ResearcherFormModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (data: Omit<Researcher, 'id'>) => Promise<void>
  initialData?: Researcher
}

export function ResearcherFormModal({
  open,
  onOpenChange,
  onSubmit,
  initialData,
}: ResearcherFormModalProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  /** Chosen file; uploaded to Cloudinary only when the user saves. */
  const [pendingImageFile, setPendingImageFile] = useState<File | null>(null)
  /** Local object URL for pending file preview (revoked on replace/remove/unmount). */
  const [localImagePreview, setLocalImagePreview] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    affiliation: '',
    email: '',
    phone: '',
    expertise: '',
    rating: 4,
    bio: '',
    image: '',
    publications: [''],
    projects: [''],
    awards: [''],
    education: [{ degree: '', institution: '', year: '' }],
    links: {
      orcid: '',
      googleScholar: '',
      linkedin: '',
      website: '',
    },
  })

  useEffect(() => {
    setLocalImagePreview(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setPendingImageFile(null)

    if (initialData) {
      setFormData({
        name: initialData.name,
        title: initialData.title,
        affiliation: initialData.affiliation || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        expertise: initialData.expertise.join(', '),
        rating: initialData.rating,
        bio: initialData.bio,
        image: initialData.image,
        publications: initialData.publications && initialData.publications.length > 0 ? initialData.publications : [''],
        projects: initialData.projects && initialData.projects.length > 0 ? initialData.projects : [''],
        awards: initialData.awards && initialData.awards.length > 0 ? initialData.awards : [''],
        education: initialData.education && initialData.education.length > 0 ? initialData.education : [{ degree: '', institution: '', year: '' }],
        links: initialData.links || { orcid: '', googleScholar: '', linkedin: '', website: '' },
      })
    } else {
      setFormData({
        name: '',
        title: '',
        affiliation: '',
        email: '',
        phone: '',
        expertise: '',
        rating: 4,
        bio: '',
        image: '',
        publications: [''],
        projects: [''],
        awards: [''],
        education: [{ degree: '', institution: '', year: '' }],
        links: {
          orcid: '',
          googleScholar: '',
          linkedin: '',
          website: '',
        },
      })
    }
  }, [initialData, open])

  const addArrayItem = (field: 'publications' | 'projects' | 'awards') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] })
  }

  const removeArrayItem = (field: 'publications' | 'projects' | 'awards', index: number) => {
    const newArray = formData[field].filter((_, i) => i !== index)
    setFormData({ ...formData, [field]: newArray.length > 0 ? newArray : [''] })
  }

  const updateArrayItem = (field: 'publications' | 'projects' | 'awards', index: number, value: string) => {
    const newArray = [...formData[field]]
    newArray[index] = value
    setFormData({ ...formData, [field]: newArray })
  }

  const addEducation = () => {
    setFormData({ ...formData, education: [...formData.education, { degree: '', institution: '', year: '' }] })
  }

  const removeEducation = (index: number) => {
    const newEducation = formData.education.filter((_, i) => i !== index)
    setFormData({ ...formData, education: newEducation.length > 0 ? newEducation : [{ degree: '', institution: '', year: '' }] })
  }

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...formData.education]
    newEducation[index] = { ...newEducation[index], [field]: value }
    setFormData({ ...formData, education: newEducation })
  }

  function handlePhotoSelected(file?: File) {
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

    setLocalImagePreview(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return URL.createObjectURL(file)
    })
    setPendingImageFile(file)
  }

  function clearPhoto() {
    setLocalImagePreview(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setPendingImageFile(null)
    setFormData(prev => ({ ...prev, image: '' }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!formData.image && !pendingImageFile) {
      toast({
        title: 'Photo required',
        description: 'Please choose a researcher photo before saving.',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)

    try {
      let imageUrl = formData.image
      if (pendingImageFile) {
        try {
          imageUrl = await uploadAdminImage(pendingImageFile, 'researcher')
        } catch (error) {
          toast({
            title: 'Upload failed',
            description: error instanceof Error ? error.message : 'Failed to upload image.',
            variant: 'destructive',
          })
          return
        }
      }

      if (!imageUrl) {
        toast({
          title: 'Photo required',
          description: 'Could not resolve image URL.',
          variant: 'destructive',
        })
        return
      }

      const submissionData: Omit<Researcher, 'id'> = {
        name: formData.name,
        title: formData.title,
        affiliation: formData.affiliation,
        email: formData.email,
        phone: formData.phone || undefined,
        expertise: formData.expertise.split(',').map(e => e.trim()).filter(Boolean),
        rating: parseFloat(String(formData.rating)),
        bio: formData.bio,
        image: imageUrl,
        publications: formData.publications.filter(p => p.trim() !== ''),
        projects: formData.projects.filter(p => p.trim() !== ''),
        awards: formData.awards.filter(a => a.trim() !== ''),
        education: formData.education.filter(e => e.degree || e.institution || e.year),
        links: {
          orcid: formData.links.orcid || undefined,
          googleScholar: formData.links.googleScholar || undefined,
          linkedin: formData.links.linkedin || undefined,
          website: formData.links.website || undefined,
        },
      }

      await onSubmit(submissionData)

      setLocalImagePreview(prev => {
        if (prev) URL.revokeObjectURL(prev)
        return null
      })
      setPendingImageFile(null)
      setFormData(prev => ({ ...prev, image: imageUrl }))
      onOpenChange(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[80vw]! w-[80vw] h-[85vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-2xl">{initialData ? 'Edit Researcher Profile' : 'Add New Researcher'}</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden">
          <Tabs defaultValue="basic" className="flex-1 flex flex-col overflow-hidden">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="basic" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="education" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                Education
              </TabsTrigger>
              <TabsTrigger value="research" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Publications & Projects
              </TabsTrigger>
              <TabsTrigger value="awards" className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                Awards
              </TabsTrigger>
              <TabsTrigger value="links" className="flex items-center gap-2">
                <LinkIcon className="w-4 h-4" />
                Links
              </TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-y-auto pr-2">
              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6 mt-0">
                <div className="grid grid-cols-2 gap-6">
                  <div className="col-span-2">
                    <Label htmlFor="name" className="text-base">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Dr. Sarah Chen"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="title" className="text-base">Title / Position *</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={e => setFormData({ ...formData, title: e.target.value })}
                      placeholder="Lead Research Analyst"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="affiliation" className="text-base">Affiliation / Institution *</Label>
                    <Input
                      id="affiliation"
                      value={formData.affiliation}
                      onChange={e => setFormData({ ...formData, affiliation: e.target.value })}
                      placeholder="MIT Research Lab"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-base">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      placeholder="researcher@university.edu"
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-base">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 (555) 123-4567"
                      className="mt-2"
                    />
                  </div>

                  <div className="col-span-2 space-y-3">
                    <Label htmlFor="image" className="text-base">Photo *</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={e => {
                        handlePhotoSelected(e.target.files?.[0])
                        e.currentTarget.value = ''
                      }}
                      className="mt-2"
                      disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">
                      JPG, PNG, or WebP up to 5MB. The photo is sent to Cloudinary when you save the profile.
                    </p>
                    {(localImagePreview || formData.image) && (
                      <div className="space-y-2">
                        <img
                          src={localImagePreview || formData.image}
                          alt="Researcher preview"
                          className="h-24 w-24 rounded-full object-cover border"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={clearPhoto}
                          disabled={loading}
                        >
                          Remove Photo
                        </Button>
                      </div>
                    )}
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="expertise" className="text-base">Research Interests / Fields *</Label>
                    <Input
                      id="expertise"
                      value={formData.expertise}
                      onChange={e => setFormData({ ...formData, expertise: e.target.value })}
                      placeholder="Machine Learning, Data Science, AI"
                      className="mt-2"
                      required
                    />
                    <p className="text-xs text-muted-foreground mt-1">Comma-separated values</p>
                  </div>

                  <div className="col-span-2">
                    <Label htmlFor="bio" className="text-base">Bio / Research Summary *</Label>
                    <Textarea
                      id="bio"
                      value={formData.bio}
                      onChange={e => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Brief overview of research background and expertise..."
                      rows={5}
                      className="mt-2"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="rating" className="text-base">Rating / Impact Score (0-5) *</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="0"
                      max="5"
                      step="0.1"
                      value={formData.rating}
                      onChange={e => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                      className="mt-2"
                      required
                    />
                  </div>
                </div>
              </TabsContent>

              {/* Education Tab */}
              <TabsContent value="education" className="space-y-4 mt-0">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-muted-foreground">Add your academic degrees and qualifications</p>
                  <Button type="button" variant="outline" size="sm" onClick={addEducation}>
                    <Plus className="w-4 h-4 mr-1" /> Add Degree
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {formData.education.map((edu, index) => (
                    <div key={index} className="bg-muted/30 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Degree {index + 1}</h4>
                        {formData.education.length > 1 && (
                          <Button type="button" variant="ghost" size="sm" onClick={() => removeEducation(index)}>
                            <X className="w-4 h-4 mr-1" /> Remove
                          </Button>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <Label>Degree</Label>
                          <Input
                            value={edu.degree}
                            onChange={e => updateEducation(index, 'degree', e.target.value)}
                            placeholder="Ph.D. in Computer Science"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Institution</Label>
                          <Input
                            value={edu.institution}
                            onChange={e => updateEducation(index, 'institution', e.target.value)}
                            placeholder="Stanford University"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label>Year</Label>
                          <Input
                            value={edu.year}
                            onChange={e => updateEducation(index, 'year', e.target.value)}
                            placeholder="2020"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Publications & Projects Tab */}
              <TabsContent value="research" className="space-y-6 mt-0">
                {/* Publications */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Publications / Papers</h3>
                      <p className="text-sm text-muted-foreground">List your published research papers</p>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('publications')}>
                      <Plus className="w-4 h-4 mr-1" /> Add Publication
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData.publications.map((pub, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={pub}
                          onChange={e => updateArrayItem('publications', index, e.target.value)}
                          placeholder="Paper title, journal/conference, year"
                        />
                        {formData.publications.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('publications', index)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Projects */}
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">Projects / Grants</h3>
                      <p className="text-sm text-muted-foreground">Research projects and funding received</p>
                    </div>
                    <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('projects')}>
                      <Plus className="w-4 h-4 mr-1" /> Add Project
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    {formData.projects.map((project, index) => (
                      <div key={index} className="flex gap-2">
                        <Input
                          value={project}
                          onChange={e => updateArrayItem('projects', index, e.target.value)}
                          placeholder="Project name and funding source"
                        />
                        {formData.projects.length > 1 && (
                          <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('projects', index)}>
                            <X className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Awards Tab */}
              <TabsContent value="awards" className="space-y-3 mt-0">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">Awards / Honors</h3>
                    <p className="text-sm text-muted-foreground">Recognition and achievements in your field</p>
                  </div>
                  <Button type="button" variant="outline" size="sm" onClick={() => addArrayItem('awards')}>
                    <Plus className="w-4 h-4 mr-1" /> Add Award
                  </Button>
                </div>
                
                <div className="space-y-2">
                  {formData.awards.map((award, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={award}
                        onChange={e => updateArrayItem('awards', index, e.target.value)}
                        placeholder="Award name and year"
                      />
                      {formData.awards.length > 1 && (
                        <Button type="button" variant="ghost" size="icon" onClick={() => removeArrayItem('awards', index)}>
                          <X className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Links Tab */}
              <TabsContent value="links" className="space-y-6 mt-0">
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Professional Links</h3>
                  <p className="text-sm text-muted-foreground">Connect your online profiles and identifiers</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="orcid" className="text-base">ORCID</Label>
                    <Input
                      id="orcid"
                      value={formData.links.orcid}
                      onChange={e => setFormData({ ...formData, links: { ...formData.links, orcid: e.target.value } })}
                      placeholder="0000-0000-0000-0000"
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Your unique researcher identifier</p>
                  </div>

                  <div>
                    <Label htmlFor="googleScholar" className="text-base">Google Scholar</Label>
                    <Input
                      id="googleScholar"
                      type="url"
                      value={formData.links.googleScholar}
                      onChange={e => setFormData({ ...formData, links: { ...formData.links, googleScholar: e.target.value } })}
                      placeholder="https://scholar.google.com/..."
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="linkedin" className="text-base">LinkedIn</Label>
                    <Input
                      id="linkedin"
                      type="url"
                      value={formData.links.linkedin}
                      onChange={e => setFormData({ ...formData, links: { ...formData.links, linkedin: e.target.value } })}
                      placeholder="https://linkedin.com/in/..."
                      className="mt-2"
                    />
                  </div>

                  <div>
                    <Label htmlFor="website" className="text-base">Personal Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.links.website}
                      onChange={e => setFormData({ ...formData, links: { ...formData.links, website: e.target.value } })}
                      placeholder="https://researcher.com"
                      className="mt-2"
                    />
                  </div>
                </div>
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
              {loading ? 'Saving...' : 'Save Researcher Profile'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
