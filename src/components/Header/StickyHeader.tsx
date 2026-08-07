import { cn } from '#/lib/utils'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { LanguageSwitcher } from '../LanguageSwitcher'
import ThemeToggle from '../ThemeToggle'

const StickyHeader = () => {
  const { t, i18n } = useTranslation()
  const [isSticky, setIsSticky] = useState(false)

  const navItems = [
    { label: t('nav.home'), href: '/' },
    { label: t('nav.services'), href: '/#our-services' }, 
    { label: t('nav.beforeAfter'), href: '/#before-after' },
    { label: t('nav.ourVibes'), href: '/#our-vibes' },
    { label: t('nav.team'), href: '/#team' },
    { label: t('nav.findUs'), href: '/#find-us' },
    { label: t('nav.reviews'), href: '/#reviews' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const stickyElement = document.getElementById('sticky-header')
      if (stickyElement) {
        setIsSticky(stickyElement.getBoundingClientRect().top <= 0)
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
      id="sticky-header"
      lang={i18n.language}
      dir={i18n.dir()}
      className={cn(
        'z-50 sticky top-0 transition-all duration-300 w-full h-[85px] my-auto',
        isSticky
          ? 'bg-white/80 dark:bg-black/50 backdrop-blur-md border-b border-border/40 shadow-sm'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-[1536px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* DESKTOP LOGO */}
          <div className="hidden md:block">
            <a href="/" className="shrink-0">
              <img
                src={darklogoURL}
                alt="logo"
                width={isSticky ? 150 : 200}
                className="hidden dark:block object-contain transition-all"
              />
              <img
                src={lightLogoURL}
                alt="logo"
                width={isSticky ? 150 : 200}
                className="dark:hidden object-contain transition-all"
              />
            </a>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* MOBILE HEADER CONTAINER */}
          <div className="md:hidden flex items-center justify-between w-full">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent"
                >
                  <Menu className="h-8 w-8 text-foreground" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side={i18n.dir() === 'rtl' ? 'right' : 'left'}
                className="flex flex-col"
              >
                <SheetHeader className="text-left border-b pb-4">
                  <SheetTitle>{t('nav.Menu') || 'Menu'}</SheetTitle>
                </SheetHeader>

                {/* Mobile Links */}
                <nav className="flex flex-col gap-2 mt-6 grow">
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <a
                        href={item.href}
                        className="text-lg font-medium py-3 border-b border-border/10"
                      >
                        {item.label}
                      </a>
                    </SheetClose>
                  ))}
                </nav>

                {/* Mobile Bottom Settings */}
                <div className="mt-auto space-y-4 pt-6 border-t">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {t('nav.Choose Language')}
                    </span>
                    <LanguageSwitcher />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">
                      {t('nav.Choose Theme')}
                    </span>
                    <ThemeToggle />
                  </div>
                </div>
              </SheetContent>
            </Sheet>

            {/* MOBILE LOGO */}
            <a href="/" className="shrink-0">
              <img
                src={darklogoURL}
                alt="logo"
                width={150}
                className="hidden dark:block object-contain"
              />
              <img
                src={lightLogoURL}
                alt="logo"
                width={150}
                className="dark:hidden object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
export default StickyHeader
