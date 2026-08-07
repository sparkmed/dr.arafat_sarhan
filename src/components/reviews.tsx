import { Star } from 'lucide-react'
import ReviewsCarousel, {
  type Review,
} from '#/components/smoothui/reviews-carousel'
import { useSection } from '#/hooks/use-site-content'

const Reviews = () => {
  const { data, t, dir, isRTL } = useSection('reviews')

  if (!data.enabled || data.items.length === 0) return null

  const reviews: Array<Review> = data.items.map((item, index) => ({
    id: index + 1,
    body: t(item.body),
    author: item.author,
    title: t(item.role),
  }))

  return (
    <div dir={dir} className="max-w-6xl mx-auto px-4">
      <div
        className={`flex flex-col gap-4 ${isRTL ? 'items-start text-right' : 'items-start text-left'}`}
      >
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20 self-start">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-bold font-mono">
            {data.badgeCount} {t(data.badgeLabel)}
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-foreground font-serif leading-tight">
          {t(data.title)}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed my-4">
          {t(data.description)}
        </p>
      </div>
      <div className="w-full overflow-visible py-4">
        <ReviewsCarousel autoPlay autoPlayInterval={10000} reviews={reviews} />
      </div>
    </div>
  )
}

export default Reviews
