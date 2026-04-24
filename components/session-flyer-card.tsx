import { Globe, MapPin, Shield, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { CehFlyerSession, FeaturedFlyerSession, SeminarFlyerSession } from '@/lib/data/featured-flyer-sessions'

function tagPill(label: string) {
  return (
    <span
      key={label}
      className="inline-flex max-w-full items-center truncate rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary/10 dark:text-primary"
    >
      {label}
    </span>
  )
}

function SessionThumbnail({ title }: { title: string }) {
  const letter = title.replace(/[^a-zA-Z]/g, '').slice(0, 1) || 'S'
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-primary/15 via-primary/5 to-secondary/15 text-lg font-bold text-primary ring-1 ring-border/60"
      aria-hidden
    >
      <span className="select-none">{letter}</span>
    </div>
  )
}

type CardModel = {
  title: string
  category: string
  description: string
  tags: string[]
  speaker: string
  venue: string
  scheduleLine: string
  extraBadge?: string
  membersCount: number
}

function toTitleCaseTag(s: string): string {
  return s
    .toLowerCase()
    .split(/\s+/)
    .map(w => (w.length <= 3 ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ')
}

function seminarToModel(s: SeminarFlyerSession): CardModel {
  const tags = s.topics.slice(0, 4).map(t => toTitleCaseTag(t.replace(/\([^)]*\)/g, '').trim()))
  const more = s.topics.length - 4
  return {
    title: s.title,
    category: s.category,
    description: s.description,
    tags: more > 0 ? [...tags, `+${more}`] : tags,
    speaker: s.speakerName,
    venue: s.venue,
    scheduleLine: `${s.sessionDate} · ${s.time}`,
    membersCount: s.membersCount ?? 24,
  }
}

function cehToModel(s: CehFlyerSession): CardModel {
  const tags = s.learnItems.slice(0, 4).map(t => toTitleCaseTag(t))
  const more = s.learnItems.length - 4
  return {
    title: s.title,
    category: s.category,
    description: s.description,
    tags: more > 0 ? [...tags, `+${more}`] : tags,
    speaker: s.deliveredBy,
    venue: `${s.venue} · Contact ${s.contact}`,
    scheduleLine: `${s.scheduleDay} · ${s.scheduleTime}`,
    extraBadge: s.sessionNo,
    membersCount: s.membersCount ?? 20,
  }
}

function SessionCard({ model }: { model: CardModel }) {
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-xl border border-[#E5E7EB] bg-white p-5 shadow-sm',
        'dark:border-border dark:bg-card dark:shadow-none',
      )}
    >
      <div className="flex gap-4">
        <SessionThumbnail title={model.title} />
        <div className="min-w-0 flex-1">
          <h2 className="border-b border-border pb-2 text-lg font-bold leading-snug tracking-tight text-primary sm:text-xl">
            {model.title}
          </h2>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-primary dark:bg-primary/10">
              <Globe className="h-3.5 w-3.5 shrink-0 opacity-80" aria-hidden />
              Public
            </span>
            {model.extraBadge && (
              <span className="rounded-full border border-border bg-muted/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                {model.extraBadge}
              </span>
            )}
          </div>
          <p className="mt-2 text-sm font-medium text-primary/90 dark:text-primary">{model.category}</p>
        </div>
      </div>

      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{model.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {model.tags.map(t =>
          t.startsWith('+') ? (
            <span
              key={t}
              className="inline-flex items-center rounded-full border border-dashed border-primary/25 px-2.5 py-0.5 text-xs font-semibold text-primary"
            >
              {t}
            </span>
          ) : (
            tagPill(t)
          ),
        )}
      </div>

      <div className="mt-5 border-t border-[#E5E7EB] pt-4 dark:border-border">
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Users className="h-4 w-4 shrink-0 opacity-70" aria-hidden />
          <span>
            <strong className="font-semibold text-foreground">{model.membersCount}</strong> members
          </span>
        </div>
        <div className="mt-2.5 inline-flex items-start gap-1.5 text-sm text-muted-foreground">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 opacity-70" aria-hidden />
          <span>{model.venue}</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          Lead: <strong className="font-semibold text-foreground">{model.speaker}</strong>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">{model.scheduleLine}</p>
      </div>

      <p className="mt-3 flex items-center gap-1.5 text-[10px] text-muted-foreground/90">
        <Shield className="h-3 w-3 shrink-0 text-primary/70" aria-hidden />
        <span className="truncate">FAST Society of Cybersecurity · NUCES</span>
      </p>
    </article>
  )
}

export function SessionFlyerCard({ session }: { session: FeaturedFlyerSession }) {
  const model = session.kind === 'ceh' ? cehToModel(session) : seminarToModel(session)
  return <SessionCard model={model} />
}
