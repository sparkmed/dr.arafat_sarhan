import { useSection } from '#/hooks/use-site-content'

const Treatment = () => {
  const { data, t, dir } = useSection('services')

  if (!data.enabled) return null

  return (
    <div
      dir={dir}
      className="flex min-h-screen items-center justify-center"
    >
      <div className="w-full max-w-(--breakpoint-lg) px-6 py-10">
        <h2 className="text-pretty font-semibold text-2xl md:text-4xl tracking-[-0.03em] sm:mx-auto sm:max-w-xl sm:text-center md:text-[2.75rem] md:leading-[1.2]">
          {t(data.title)}
        </h2>
        <p className="mt-2 text-lg text-muted-foreground sm:text-center sm:text-3xl">
          {t(data.subtitle)}
        </p>
        <div className="mx-auto mt-8 w-full space-y-20 md:mt-16">
          {data.items.map((treatment) => (
            <div
              className="flex flex-col items-center gap-x-12 gap-y-6 md:flex-row md:even:flex-row-reverse"
              key={treatment.id}
            >
              <div className="overflow-hidden rounded-xl border border-border/50 bg-muted basis-1/2 aspect-[4/3] w-full">
                <img
                  src={treatment.image}
                  alt={t(treatment.title)}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>

              <div className="shrink-0 basis-1/2">
                <h4 className="my-3 font-semibold text-3xl tracking-[-0.02em]">
                  {t(treatment.title)}
                </h4>
                <p className="text-muted-foreground text-lg">
                  {t(treatment.details)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Treatment
