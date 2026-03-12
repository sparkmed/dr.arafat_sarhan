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

  const darklogoURL =
    'https://marvelous-fish-345.convex.cloud/api/storage/9d521bf6-d1e5-4138-b9d2-abe3173c7b86'

  const lightLogoURL =
    'https://marvelous-fish-345.convex.cloud/api/storage/bee39baa-a87f-4a8d-9ece-8ebd42041c24'

  return (
    <header
      className={cn(
        'z-50 sticky top-0 transition-all duration-300',
        isSticky
          ? 'bg-white/70 dark:bg-black/30 backdrop-blur-md border-b border-border/40 shadow-sm'
          : 'bg-transparent',
      )}
      lang={i18n.language}
      dir={i18n.dir()}
      id="sticky-header"
    >
      <div
        className={cn(
          'w-full max-w-[1536px] mx-auto transition-all duration-300 py-2', // Added py-2 for better spacing
          isSticky && 'max-w-[min(100%,1920px)] px-6',
        )}
      >
        <div className="flex items-center justify-between">
          <a href="/" className="shrink-0">
            <img
              src={darklogoURL}
              alt="logo"
              width={isSticky ? 180 : 250} // Shrink logo slightly on scroll for a smoother feel
              className="hidden object-contain mix-blend-multiply transition-all duration-300 dark:block"
            />
            <img
              src={lightLogoURL}
              alt="logo"
              width={isSticky ? 180 : 250}
              className="object-contain mix-blend-multiply transition-all duration-300 dark:hidden"
            />
          </a>
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
