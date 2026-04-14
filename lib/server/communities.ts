import 'server-only'
import { supabase } from '@/lib/supabase'

export interface CommunityMember {
  id: string
  name: string
  role: string
}

export interface Community {
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

export async function getAllCommunities(): Promise<Community[]> {
  try {
    const { data: communities, error: communitiesError } = await supabase
      .from('communities')
      .select('*')
      .order('id', { ascending: true })
    
    if (communitiesError) {
      console.error('Error fetching communities:', communitiesError)
      return []
    }

    if (!communities) return []

    // Fetch members for all communities
    const communitiesWithMembers = await Promise.all(
      communities.map(async (community) => {
        const { data: members, error: membersError } = await supabase
          .from('community_members')
          .select('member_id, member_name, role')
          .eq('community_id', community.id)

        if (membersError) {
          console.error('Error fetching members:', membersError)
          return {
            ...community,
            adminName: community.admin_name,
            adminEmail: community.admin_email,
            members: []
          }
        }

        return {
          ...community,
          adminName: community.admin_name,
          adminEmail: community.admin_email,
          members: (members || []).map((m: any) => ({
            id: m.member_id,
            name: m.member_name,
            role: m.role
          }))
        }
      })
    )

    return communitiesWithMembers
  } catch (error) {
    console.error('Error fetching communities:', error)
    return []
  }
}

export async function getCommunityById(id: string): Promise<Community | null> {
  try {
    const { data: community, error: communityError } = await supabase
      .from('communities')
      .select('*')
      .eq('id', id)
      .single()
    
    if (communityError || !community) {
      console.error('Error fetching community:', communityError)
      return null
    }

    // Fetch members for this community
    const { data: members, error: membersError } = await supabase
      .from('community_members')
      .select('member_id, member_name, role')
      .eq('community_id', id)

    if (membersError) {
      console.error('Error fetching members:', membersError)
      return {
        ...community,
        adminName: community.admin_name,
        adminEmail: community.admin_email,
        members: []
      }
    }

    return {
      ...community,
      adminName: community.admin_name,
      adminEmail: community.admin_email,
      members: (members || []).map((m: any) => ({
        id: m.member_id,
        name: m.member_name,
        role: m.role
      }))
    }
  } catch (error) {
    console.error('Error fetching community:', error)
    return null
  }
}

function memberRows(communityId: string | number, members: CommunityMember[]) {
  return members.map(member => ({
    community_id: communityId,
    member_id: member.id,
    member_name: member.name,
    member_type: member.id.startsWith('P') ? 'person' : 'researcher',
    role: member.role,
  }))
}

export async function addCommunity(community: Omit<Community, 'id'>): Promise<Community> {
  try {
    const { members, adminName, adminEmail, name, description, category, logo, privacy, rules, location, tags } =
      community

    const { data, error } = await supabase
      .from('communities')
      .insert([
        {
          name,
          description,
          category,
          logo: logo ?? null,
          privacy,
          rules: rules ?? null,
          location: location ?? null,
          tags: tags ?? [],
          admin_name: adminName,
          admin_email: adminEmail,
        },
      ])
      .select()
      .single()

    if (error) throw error

    if (members && members.length > 0) {
      const { error: membersError } = await supabase
        .from('community_members')
        .insert(memberRows(data.id, members))

      if (membersError) {
        console.error('Error adding members:', membersError)
      }
    }

    return {
      ...data,
      id: String(data.id),
      adminName: data.admin_name,
      adminEmail: data.admin_email,
      members: members || [],
    }
  } catch (error) {
    console.error('Error adding community:', error)
    throw error
  }
}

function partialCommunityRow(updates: Partial<Community>): Record<string, unknown> {
  const row: Record<string, unknown> = {}
  if (updates.name !== undefined) row.name = updates.name
  if (updates.description !== undefined) row.description = updates.description
  if (updates.category !== undefined) row.category = updates.category
  if (updates.logo !== undefined) row.logo = updates.logo
  if (updates.privacy !== undefined) row.privacy = updates.privacy
  if (updates.rules !== undefined) row.rules = updates.rules
  if (updates.location !== undefined) row.location = updates.location
  if (updates.tags !== undefined) row.tags = updates.tags
  if (updates.adminName !== undefined) row.admin_name = updates.adminName
  if (updates.adminEmail !== undefined) row.admin_email = updates.adminEmail
  return row
}

export async function updateCommunity(id: string, updates: Partial<Community>): Promise<Community | null> {
  try {
    const { members, ...fieldUpdates } = updates
    const updateData = partialCommunityRow(fieldUpdates)

    if (Object.keys(updateData).length > 0) {
      const { error } = await supabase.from('communities').update(updateData).eq('id', id)

      if (error) {
        console.error('Error updating community:', error)
        return null
      }
    }

    if (members !== undefined) {
      const { error: delErr } = await supabase.from('community_members').delete().eq('community_id', id)
      if (delErr) {
        console.error('Error clearing community members:', delErr)
        return null
      }
      if (members.length > 0) {
        const { error: insErr } = await supabase.from('community_members').insert(memberRows(id, members))
        if (insErr) {
          console.error('Error inserting community members:', insErr)
          return null
        }
      }
    }

    return getCommunityById(id)
  } catch (error) {
    console.error('Error updating community:', error)
    return null
  }
}

export async function deleteCommunity(id: string): Promise<boolean> {
  try {
    // Members will be automatically deleted due to CASCADE
    const { error } = await supabase
      .from('communities')
      .delete()
      .eq('id', id)
    
    if (error) {
      console.error('Error deleting community:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error deleting community:', error)
    return false
  }
}

export async function addMember(communityId: string, member: CommunityMember): Promise<Community | null> {
  try {
    const { error } = await supabase
      .from('community_members')
      .insert([{
        community_id: communityId,
        member_id: member.id,
        member_name: member.name,
        member_type: member.id.startsWith('P') ? 'person' : 'researcher',
        role: member.role
      }])

    if (error) throw error

    return getCommunityById(communityId)
  } catch (error) {
    console.error('Error adding member:', error)
    return null
  }
}

export async function updateMember(communityId: string, memberId: string, updates: Partial<CommunityMember>): Promise<Community | null> {
  try {
    const updateData: any = {}
    if (updates.name) updateData.member_name = updates.name
    if (updates.role) updateData.role = updates.role

    const { error } = await supabase
      .from('community_members')
      .update(updateData)
      .eq('community_id', communityId)
      .eq('member_id', memberId)

    if (error) throw error

    return getCommunityById(communityId)
  } catch (error) {
    console.error('Error updating member:', error)
    return null
  }
}

export async function deleteMember(communityId: string, memberId: string): Promise<Community | null> {
  try {
    const { error } = await supabase
      .from('community_members')
      .delete()
      .eq('community_id', communityId)
      .eq('member_id', memberId)

    if (error) throw error

    return getCommunityById(communityId)
  } catch (error) {
    console.error('Error deleting member:', error)
    return null
  }
}
