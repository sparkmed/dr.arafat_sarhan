import { Badge } from '#/components/ui/badge'
import { cn } from '#/lib/utils'
import { useSection } from '#/hooks/use-site-content'
import type { TeamMember } from '#/lib/site-content'

function MemberCard({
  member,
  index,
  t,
}: {
  member: TeamMember
  index: number
  t: (value: { en: string; ar: string } | undefined) => string
}) {
  const name = t(member.name)
  const bio = t(member.description)

  return (
    <div
      className={cn(
        'group flex flex-col gap-3',
        // Staggers every other card down, so the grid reads less like a table.
        index % 2 === 1 && 'lg:translate-y-8',
      )}
    >
      <div className="bg-muted relative aspect-[3/4] overflow-hidden rounded-2xl">
        {member.photo ? (
          <img
            src={member.photo}
            alt={name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover md:grayscale transition-all duration-500 ease-out group-hover:scale-105 group-hover:grayscale-0"
          />
        ) : null}

        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/85 via-zinc-950/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {t(member.experience) ? (
          <span className="absolute top-3 end-3 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold text-zinc-900 backdrop-blur-sm">
            {t(member.experience)}
          </span>
        ) : null}

        {bio ? (
          <p className="absolute inset-x-0 bottom-0 translate-y-3 p-4 text-sm leading-relaxed text-white opacity-0 transition-all delay-75 duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {bio}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-0.5">
        <h3 className="text-foreground font-semibold tracking-tight">{name}</h3>
        <p className="text-muted-foreground text-sm">{t(member.speciality)}</p>
      </div>
    </div>
  )
}

const Team = () => {
  const { data, t, dir } = useSection('team')

  if (!data.enabled || data.members.length === 0) return null

  return (
    <section
      dir={dir}
      className="w-full overflow-hidden py-16 md:py-24"
      aria-labelledby="team-title"
    >
      <div className="mx-auto max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="mb-14 flex flex-col items-center gap-4 text-center sm:mb-16">
          {t(data.badge) ? (
            <Badge
              variant="outline"
              className="rounded-full px-4 py-1 text-sm font-normal"
            >
              {t(data.badge)}
            </Badge>
          ) : null}
          <h2
            id="team-title"
            className="text-foreground max-w-3xl text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl"
          >
            {t(data.title)}
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-base md:text-lg">
            {t(data.description)}
          </p>
        </div>

        <div className="mb-14 grid grid-cols-2 gap-4 sm:mb-16 sm:grid-cols-3 md:gap-6 lg:grid-cols-5">
          {data.members.map((member, index) => (
            <MemberCard
              key={member.id}
              member={member}
              index={index}
              t={t}
            />
          ))}
        </div>

        {t(data.footerText) ? (
          <p className="text-muted-foreground mx-auto max-w-2xl text-center text-sm md:text-base">
            {t(data.footerText)}
          </p>
        ) : null}
      </div>
    </section>
  )
}

export default Team
