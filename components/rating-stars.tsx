import { Star } from 'lucide-react'

interface RatingStarsProps {
  rating: number
  size?: number
}

export function RatingStars({ rating, size = 16 }: RatingStarsProps) {
  return (
    <div className="flex gap-0.5 items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < Math.floor(rating) ? 'fill-accent text-accent' : 'text-muted-foreground'}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-1">{rating.toFixed(1)}</span>
    </div>
  )
}
