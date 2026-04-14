import 'server-only'
import { randomUUID } from 'crypto'
import { supabase } from '@/lib/supabase'

export interface Person {
  id: string
  name: string
  email: string
  phone?: string
  organization?: string
  role?: string
}

export async function getAllPeople(): Promise<Person[]> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) {
      console.error('Error fetching people:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching people:', error)
    return []
  }
}

export async function getPersonById(id: string): Promise<Person | null> {
  try {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching person:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching person:', error)
    return null
  }
}

export async function addPerson(person: Omit<Person, 'id'>): Promise<Person> {
  try {
    const row: Person = {
      id: randomUUID(),
      name: person.name,
      email: person.email,
      phone: person.phone,
      organization: person.organization,
      role: person.role,
    }
    const { data, error } = await supabase
      .from('people')
      .insert([row])
      .select()
      .single()
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error adding person:', error)
    throw error
  }
}

export async function updatePerson(id: string, updates: Partial<Person>): Promise<Person | null> {
  try {
    const { data, error } = await supabase
      .from('people')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating person:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error updating person:', error)
    return null
  }
}

export async function deletePerson(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('people')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting person:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error deleting person:', error)
    return false
  }
}
