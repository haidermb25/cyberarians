import 'server-only'
import { supabase } from '@/lib/supabase'

export interface Researcher {
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
  education?: {
    degree: string
    institution: string
    year: string
  }[]
  links?: {
    orcid?: string
    googleScholar?: string
    linkedin?: string
    website?: string
  }
}

export async function getAllResearchers(): Promise<Researcher[]> {
  try {
    const { data, error } = await supabase
      .from('researchers')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) {
      console.error('Error fetching researchers:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching researchers:', error)
    return []
  }
}

export async function getResearcherById(id: string): Promise<Researcher | null> {
  try {
    const { data, error } = await supabase
      .from('researchers')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching researcher:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching researcher:', error)
    return null
  }
}

export async function addResearcher(researcher: Omit<Researcher, 'id'>): Promise<Researcher> {
  try {
    const { data, error } = await supabase
      .from('researchers')
      .insert([researcher])
      .select()
      .single()
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error adding researcher:', error)
    throw error
  }
}

export async function updateResearcher(id: string, updates: Partial<Researcher>): Promise<Researcher | null> {
  try {
    const { data, error } = await supabase
      .from('researchers')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating researcher:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error updating researcher:', error)
    return null
  }
}

export async function deleteResearcher(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('researchers')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting researcher:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error deleting researcher:', error)
    return false
  }
}
