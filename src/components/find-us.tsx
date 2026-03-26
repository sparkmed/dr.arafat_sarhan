import React from 'react'
import { MapPin, Phone, Clock, ExternalLink, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTranslation } from 'react-i18next'

const FindUs = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language.startsWith('ar')

  const mapUrl = 'https://share.google/WrOcvaHjPDGgmd3Tn'
  const reviewUrl =
    'https://g.page/r/CYtZyn5SYLSTEAI/review'

  return (
    <section
      className="py-20 px-4 max-w-7xl mx-auto "
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="flex items-center justify-center w-full py-4 pb-12 text-center">
        <div className="flex flex-col gap-y-3">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground font-serif leading-tight">
            {t('findUs.findusTitle')}
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            {t('findUs.description')}
          </p>
          <div className={`flex justify-center ${isRTL ? 'rtl' : 'ltr'}`}>
            <Button
              onClick={() => window.open(reviewUrl, '_blank')}
              variant="outline"
              className="rounded-full px-6 h-12 flex gap-2 border-primary/20 bg-card text-foreground hover:bg-primary/5 shadow-md"
            >
              <Star size={18} className="text-yellow-500 fill-yellow-500" />
              {t('findUs.addReview')}
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
                <p className="font-bold text-lg">{t('findUs.locationTitle')}</p>
                <p className="text-muted-foreground">{t('findUs.address')}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-5 rounded-2xl bg-card border border-border transition-all hover:border-primary/50">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <Phone size={24} />
              </div>
              <div>
                <p className="font-bold text-lg mb-1">{t('findUs.callUs')}</p>
                <a
                  href="tel:+972599888009"
                  className="flex items-center gap-3 hover:text-primary transition-colors text-muted-foreground"
                >
                  <span dir="ltr" className="font-mono text-lg font-medium">
                    +972 599 888 009
                  </span>
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 rounded-2xl bg-card border border-border">
              <div className="p-3 bg-primary/10 rounded-xl text-primary shrink-0">
                <Clock size={24} />
              </div>
              <div>
                <p className="font-bold text-lg">{t('findUs.hoursTitle')}</p>
                <div className="text-muted-foreground text-sm mt-1">
                  <p>{t('findUs.hoursDetail')}</p>
                  <p className="text-destructive mt-1 font-medium">
                    {t('findUs.closed')}
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
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3389.544766981881!2d35.2033!3d31.906!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzHCsDU0JzIyLjIiTiAzNcKwMTInMTEuOSJF!5e0!3m2!1sen!2s!4v1711410000000!5m2!1sen!2s"
              className="w-full h-full grayscale hover:grayscale-0 transition-all duration-700 pointer-events-auto"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>

            <div className="absolute bottom-6 right-6 left-6">
              <Button
                onClick={() => window.open(mapUrl, '_blank')}
                className="w-full rounded-full h-14 bg-primary text-white hover:scale-[1.02] transition-transform shadow-xl font-bold text-lg gap-2"
              >
                {t('findUs.openMap')}
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
