import { useTranslation } from 'react-i18next'
import ReviewsCarousel, {
  type Review,
} from '#/components/smoothui/reviews-carousel'

import { Star } from 'lucide-react'

const Reviews = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language.startsWith('ar')
  const sampleReviews: Review[] = [
    {
      id: 1,
      body: isRTL
        ? 'أروع دكتور وأفضل خدمات، بجد لنا سنين معكم ونفتخر بكم وبخبراتكم المتفوقة في البلد. شيء نفتخر به حقاً.'
        : 'The most wonderful doctor and the best services. We have been with you for years and are proud of your superior expertise in the country. Something to truly be proud of.',
      author: 'Murad Rateb',
      title: isRTL ? 'مراجع دائم' : 'Long-time Patient',
    },
    {
      id: 2,
      body: isRTL
        ? 'مركز متخصص منظم، مريح ونظيف. كانت التجربة تخص الأطفال، وقام المركز بتخصيص دكتور متخصص لهم وكانت المتابعة ممتازة.'
        : 'A specialized, organized, comfortable, and clean center. My experience was with children; the center assigned a pediatric specialist, and the follow-up was excellent.',
      author: 'Mohammad Safi',
      title: isRTL ? 'مراجع' : 'Patient',
    },
    {
      id: 3,
      body: isRTL
        ? 'أفضل تجربة وأروع طاقم طبي عن تجربة شخصية. عيادة أكثر من رائعة والشغل عندهم بمهنية عالية جداً.'
        : 'The best experience and the most wonderful medical staff based on personal experience. An amazing clinic with highly professional work.',
      author: 'Abu Ahmed',
      title: isRTL ? 'مراجع' : 'Patient',
    },
    {
      id: 4,
      body: isRTL
        ? 'كل الشكر للدكتور عرفات والدكتورة إسراء منصور وكل الطاقم الذي يتميز بخدمته وخبرته. أنا وعائلتي نعتمد عليهم دائماً.'
        : 'Special thanks to Dr. Arafat, Dr. Israa Mansour, and the entire staff for their amazing service and expertise. My family and I only trust them.',
      author: 'Reema Ara',
      title: isRTL ? 'مراجعة' : 'Patient',
    },
    {
      id: 5,
      body: isRTL
        ? 'المركز والطاقم أكثر من رائعين والشغل مثالي (Perfect)، أنصح الجميع بالتعامل معهم.'
        : 'The center and the staff are more than wonderful, the work is perfect. I highly recommend them to everyone.',
      author: 'Amaal Badaha',
      title: isRTL ? 'مراجعة' : 'Patient',
    },
    {
      id: 6,
      body: isRTL
        ? 'الدكتور عرفات سرحان دكتور فخم جداً ومن أفضل الأطباء في فلسطين. أسلوبه راقي ومريح، مهني جداً ويشرح الحالة بكل وضوح وشفافية.'
        : 'Dr. Arafat Sarhan is a top-tier doctor and one of the best in Palestine. His style is sophisticated and comfortable; he is very professional and explains the case with clarity and transparency.',
      author: 'Ameed Asmah',
      title: isRTL ? 'مراجع' : 'Patient',
    },
  ]
  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="max-w-6xl mx-auto px-4">
      <div
        className={`flex flex-col gap-4 ${isRTL ? 'items-start text-right' : 'items-start text-left'}`}
      >
        <div className="flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full border border-primary/20 self-start">
          <Star size={16} fill="currentColor" />
          <span className="text-sm font-bold font-mono">
            43+ {t('reviews.badge')}
          </span>
        </div>

        <h2 className="text-4xl md:text-6xl font-bold text-foreground font-serif leading-tight">
          {t('reviews.title')}
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed my-4">
          {t('reviews.description')}
        </p>
      </div>
      <div className="w-full overflow-visible py-4">
        <ReviewsCarousel
          autoPlay
          autoPlayInterval={10000}
          reviews={sampleReviews}
        />
      </div>
    </div>
  )
}

export default Reviews
