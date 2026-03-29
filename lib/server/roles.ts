import 'server-only'
import { supabase } from '@/lib/supabase'

export interface Role {
  id: string
  name: string
  description: string
}

export async function getAllRoles(): Promise<Role[]> {
  try {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .order('id', { ascending: true })
    
    if (error) {
      console.error('Error fetching roles:', error)
      return []
    }
    
    return data || []
  } catch (error) {
    console.error('Error fetching roles:', error)
    return []
  }
}

export async function getRoleById(id: string): Promise<Role | null> {
  try {
    const { data, error } = await supabase
      .from('roles')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching role:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error fetching role:', error)
    return null
  }
}

export async function addRole(role: Omit<Role, 'id'>): Promise<Role> {
  try {
    const { data, error } = await supabase
      .from('roles')
      .insert([role])
      .select()
      .single()
    
    if (error) throw error
    
    return data
  } catch (error) {
    console.error('Error adding role:', error)
    throw error
  }
}

export async function updateRole(id: string, updates: Partial<Role>): Promise<Role | null> {
  try {
    const { data, error } = await supabase
      .from('roles')
      .update(updates)
      .eq('id', id)
      .select()
      .single()
    
    if (error) {
      console.error('Error updating role:', error)
      return null
    }
    
    return data
  } catch (error) {
    console.error('Error updating role:', error)
    return null
  }
}

export async function deleteRole(id: string): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('roles')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting role:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error deleting role:', error)
    return false
  }
}
