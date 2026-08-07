import { Link } from '@tanstack/react-router'
import { Button } from './ui/button'
import { Highlighter } from './ui/highlighter'
import { PixelImage } from './ui/pixel-image'
import { useSection } from '#/hooks/use-site-content'

const Hero = () => {
  const { data, t } = useSection('hero')

  if (!data.enabled) return null

  return (
    <div className="flex flex-col lg:flex-row items-center justify-between p-8 lg:p-16 bg-card border-border border-[1px] rounded-[2rem] shadow-sm gap-12 mx-4">
      <div className="flex flex-col items-center lg:items-start w-full lg:w-1/2 gap-y-8">
        <h1 className="display-title text-4xl lg:text-6xl text-center lg:text-start leading-[1.15] tracking-tight">
          <Highlighter
            action="underline"
            color="#F59E0B"
            strokeWidth={3}
            padding={2}
          >
            <span className="relative inline-block">{t(data.title1)}</span>
          </Highlighter>
          <br />
          <span className="relative text-primary italic">{t(data.title2)}</span>
        </h1>
        <div className="space-y-6 text-center lg:text-start text-lg text-muted-foreground max-w-3xl leading-relaxed">
          <p>
            <Highlighter action="highlight" color="rgba(245, 158, 11, 0.15)">
              <span className="relative text-foreground font-semibold text-xl">
                {t(data.doctorName)}
              </span>
            </Highlighter>{' '}
            {t(data.paragraph1)}{' '}
            <Highlighter
              action="underline"
              color="#F59E0B"
              strokeWidth={3}
              padding={2}
            >
              <span className="text-foreground font-medium">
                {t(data.university)}{' '}
              </span>
            </Highlighter>
            {t(data.paragraph1After)}
          </p>

          {t(data.quote) ? (
            <p className="hidden lg:block border-l-2 border-primary/20 pl-6 italic text-base">
              " {t(data.quote)}"
            </p>
          ) : null}
          <p>{t(data.paragraph2)}</p>
        </div>

        {/* Experience Badge */}
        <div className="flex items-center gap-3 px-5 py-2 bg-primary/5 border border-primary/20 text-primary rounded-full md:text-sm text-xs font-semibold tracking-wide uppercase">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
          </span>
          {t(data.badge)}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center  gap-4 pt-2">
          <Button
            asChild
            size="lg"
            className="rounded-full px-10 h-14 text-base font-bold shadow-lg shadow-primary/20 hover:scale-105 transition-transform"
          >
            <Link to="/bookappointment">{t(data.primaryCta)}</Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="rounded-full px-10 h-14 text-base font-medium hover:bg-primary/5"
          >
            <a href="#our-services">{t(data.secondaryCta)}</a>
          </Button>
        </div>
      </div>
      <div className=" ">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-0 hover:rotate-1 transition-transform duration-200">
          <PixelImage customGrid={{ rows: 1, cols: 6 }} src={data.image} />
        </div>
      </div>
    </div>
  )
}

export default Hero
