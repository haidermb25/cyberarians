import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function ResearchersSkeleton() {
  return (
    <>
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <Skeleton className="h-40 w-full" />
          <div className="p-6 space-y-4">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <div className="space-y-2">
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}

export function CommunitiesSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, i) => (
        <Card key={i} className="p-6 space-y-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-4 w-1/2" />
        </Card>
      ))}
    </>
  )
}
