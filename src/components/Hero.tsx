import { Button } from './ui/button'
import { Highlighter } from './ui/highlighter'
import { PixelImage } from './ui/pixel-image'
import { useTranslation } from 'react-i18next'

const Hero = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16 bg-card border-border border-[1px] rounded-[2rem] shadow-sm gap-12">
      <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 gap-y-8">
        <h1 className="display-title text-4xl lg:text-6xl text-center lg:text-start leading-[1.15] tracking-tight">
          <Highlighter
            action="underline"
            color="#F59E0B"
            strokeWidth={3}
            padding={2}
          >
            {t('hero.title1')}
          </Highlighter>
          <br />
          <span className="text-primary italic">{t('hero.title2')}</span>
        </h1>
        <div className="space-y-6 text-center lg:text-start text-lg text-muted-foreground max-w-3xl leading-relaxed">
          <p>
            <Highlighter action="highlight" color="rgba(245, 158, 11, 0.15)">
              <span className="text-foreground font-semibold text-xl">
                {t('hero.doctorName')}
              </span>
            </Highlighter>{' '}
            {t('hero.doctorParagraph1')}{' '}
            <Highlighter
              action="underline"
              color="#F59E0B"
              strokeWidth={3}
              padding={2}
            >
              <span className="text-foreground font-medium">
                {t('hero.university')}{' '}
              </span>
            </Highlighter>
            {t('hero.doctorParagraph1_1')}
          </p>

          <p className="hidden lg:block border-l-2 border-primary/20 pl-6 italic text-base">
            " {t('hero.doctorQuote')}"
          </p>
          <p>{t('hero.doctorParagraph2')}</p>
        </div>

        {/* Experience Badge */}
        <div className="flex items-center gap-3 px-5 py-2 bg-primary/5 border border-primary/20 text-primary rounded-full text-sm font-semibold tracking-wide uppercase">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          25+ Years of Clinical Excellence
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 pt-2">
          <Button
            size="lg"
            className="rounded-full px-10 h-14 text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            Book Appointment
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 h-14 text-base font-medium hover:bg-primary/5"
          >
            View Services
          </Button>
        </div>
      </div>

      {/* Image Side */}
      <div className=" ">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-0 hover:rotate-1 transition-transform duration-200">
          <PixelImage
            customGrid={{ rows: 3, cols: 3 }}
            src="https://marvelous-fish-345.convex.cloud/api/storage/ebfeb54d-4bf5-4df1-abbe-59562bd2f2a4"
          />
        </div>
      </div>
    </div>
  )
}

export default Hero
