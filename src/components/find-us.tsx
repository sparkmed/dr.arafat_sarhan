import { Clock, ExternalLink, MapPin, Phone, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSection } from '#/hooks/use-site-content'

const FindUs = () => {
  const { data, t, dir, isRTL } = useSection('findUs')

  if (!data.enabled) return null

  const telHref = `tel:${data.phone.replace(/[^\d+]/g, '')}`

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto " dir={dir}>
      <div className="flex items-center justify-center w-full py-4 pb-12 text-center">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif leading-tight">
            {t(data.title)}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t(data.description)}
          </p>
          <div className={`flex justify-center ${dir}`}>
            <Button
              onClick={() => window.open(data.reviewUrl, '_blank')}
              variant="outline"
              className="rounded-full px-6 h-12 flex gap-2 border-primary/20 bg-card text-foreground hover:bg-primary/5 shadow-md"
            >
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              {t(data.addReviewLabel)}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-stretch">
        <div
          className={`space-y-10 order-1 ${isRTL ? 'text-right' : 'text-left'}`}
        >
          <div className="grid gap-6">
            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border transition-all hover:border-primary/50">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <MapPin size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">{t(data.locationTitle)}</p>
                <p className="text-muted-foreground">{t(data.address)}</p>
              </div>
            </div>

            <a
              href={telHref}
              className="group flex items-center gap-4 p-5 rounded-2xl bg-card border border-border transition-all hover:border-primary/50 hover:shadow-md active:scale-[0.98]"
            >
              {/* Icon Container */}
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Phone size={24} />
              </div>

              {/* Text Content */}
              <div>
                <p className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                  {t(data.callUsLabel)}
                </p>
                <div className="flex items-center gap-3 text-muted-foreground">
                  <span dir="ltr" className="font-mono text-lg font-medium">
                    {data.phone}
                  </span>
                </div>
              </div>
            </a>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">{t(data.hoursTitle)}</p>
                <div className="text-muted-foreground text-sm mt-1">
                  <p>{t(data.hoursDetail)}</p>
                  <p className="text-destructive mt-1 font-medium">
                    {t(data.closed)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* العمود الأيمن: الخريطة وزر التقييم */}
        <div className="order-2 flex flex-col gap-6">
          <div className="group relative rounded-[3rem] overflow-hidden shadow-2xl flex-grow border-8 border-white dark:border-card min-h-[400px]">
            <iframe
              src={data.mapEmbedUrl}
              title={t(data.locationTitle)}
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="absolute bottom-6 right-6 left-6">
              <Button
                onClick={() => window.open(data.mapUrl, '_blank')}
                className="w-full rounded-full h-14 bg-primary text-white hover:scale-[1.02] transition-transform shadow-xl font-bold text-lg gap-2"
              >
                {t(data.openMapLabel)}
                <ExternalLink size={20} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FindUs
