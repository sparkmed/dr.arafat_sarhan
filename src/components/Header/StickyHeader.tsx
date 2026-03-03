import { cn } from '#/lib/utils'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'

const StickyHeader = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'
  const [isSticky, setIsSticky] = useState(false)

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
  const mainLogoURL =
    'https://marvelous-fish-345.convex.cloud/api/storage/bee39baa-a87f-4a8d-9ece-8ebd42041c24'

  const stickyLogoURL =
    'https://marvelous-fish-345.convex.cloud/api/storage/bee39baa-a87f-4a8d-9ece-8ebd42041c24'

  return (
    <header
      className="z-10 sticky top-0 max-h-fit"
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
        <a href="/">
          {!isSticky ? (
            <img
              key="mainLogoURL"
              src={mainLogoURL}
              alt="logo"
              width={200}
              height={60}
              className="hidden xl:block px-2 object-contain mix-blend-multiply"
            />
          ) : (
            <img
              key="stickyLogoURL"
              src={stickyLogoURL}
              alt="logo"
              width={200}
              height={60}
              className="hidden xl:block px-2 object-contain mix-blend-multiply"
            />
          )}
        </a>
      </div>
    </header>
  )
}

export default StickyHeader
