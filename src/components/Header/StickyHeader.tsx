import { cn } from '#/lib/utils'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

const StickyHeader = () => {
  const { t, i18n } = useTranslation()
  const [isSticky, setIsSticky] = useState(false)

  // 1. Define your navigation items
  const navItems = [
    { label: t('nav.home'), href: '#' },
    { label: t('nav.services'), href: '#services' },
    { label: t('nav.works'), href: '#works' },
    { label: t('nav.beforeAfter'), href: '#before-after' },
    { label: t('nav.team'), href: '#team' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const stickyElement = document.getElementById('sticky-header')
      if (stickyElement) {
        const rect = stickyElement.getBoundingClientRect()
        setIsSticky(rect.top <= 0)
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const logoURL =
    'https://marvelous-fish-345.convex.cloud/api/storage/bee39baa-a87f-4a8d-9ece-8ebd42041c24'

  return (
    <header
      className=" z-10 sticky top-0 max-h-fit"
      lang={i18n.language}
      dir={i18n.dir()}
      id="sticky-header"
    >
      <div
        className={cn(
          'w-full max-w-[1536px] mx-auto transition-all duration-300',
          isSticky && 'max-w-[min(100%,1920px)]',
        )}
      >
        <div className="flex items-center justify-between py-4 ">
          <a href="/" className="shrink-0">
            <img
              src={logoURL}
              alt="logo"
              width={isSticky ? 140 : 180} // Shrink logo slightly when sticky
              className="object-contain mix-blend-multiply transition-all duration-300"
            />
          </a>

          {/* NAVIGATION LINKS */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-6">
            {navItems.map((item) => (
              <Button
                key={item.href}
                variant="ghost"
                asChild
                className="text-sm font-medium hover:bg-transparent"
              >
                <a
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors no-underline"
                >
                  {item.label}
                </a>
              </Button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default StickyHeader
