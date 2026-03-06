import { ArrowRight } from 'lucide-react'
import { Button } from '#/components/ui/button'
import { useTranslation } from 'react-i18next'
import { treatments, treatmentsPargraph } from '#/constants/treatments'

const Treatment = () => {
  const { i18n } = useTranslation()
  const currentLanguage = (i18n.language.startsWith('ar') ? 'ar' : 'en') as
    | 'en'
    | 'ar'

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-(--breakpoint-lg) px-6 py-10">
        <h2 className="text-pretty font-semibold text-4xl tracking-[-0.03em] sm:mx-auto sm:max-w-xl sm:text-center md:text-[2.75rem] md:leading-[1.2]">
          {treatmentsPargraph[currentLanguage].Title}
        </h2>
        <p className="mt-2 text-lg text-muted-foreground sm:text-center sm:text-xl">
          {treatmentsPargraph[currentLanguage].Sub}
        </p>
        <div className="mx-auto mt-8 w-full space-y-20 md:mt-16">
          {treatments?.map((treatment) => (
            <div
              className="flex flex-col items-center gap-x-12 gap-y-6 md:flex-row md:even:flex-row-reverse"
              key={treatment.id}
            >
              {/* REPLACED DIV WITH THIS IMAGE CONTAINER */}
              <div className="overflow-hidden rounded-xl border border-border/50 bg-muted basis-1/2 aspect-[4/3] w-full">
                <img
                  src={treatment.image}
                  alt={treatment[currentLanguage].title}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="shrink-0 basis-1/2">
                <h4 className="my-3 font-semibold text-3xl tracking-[-0.02em]">
                  {treatment[currentLanguage].title}
                </h4>
                <p className="text-muted-foreground">
                  {treatment[currentLanguage].details}
                </p>
                <Button asChild className="mt-6 gap-3 rounded-full" size="lg">
                  <a href={treatment[currentLanguage].tutorialLink}>
                    Learn More <ArrowRight />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Treatment
