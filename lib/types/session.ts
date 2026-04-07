export interface Session {
  id: string
  name: string
  description: string | null
  startsAt: string | null
  endsAt: string | null
  /** Active / in-progress (from `working`, `is_working`, or `is_live` in DB) */
  working: boolean
  location: string | null
  format: string | null
  facilitator: string | null
  maxParticipants: number | null
  sessionType: string | null
}
