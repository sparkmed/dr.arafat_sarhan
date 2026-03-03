import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../LanguageSwitcher'
import ThemeToggle from '../ThemeToggle'
import { Badge } from '../ui/badge'
import { MessageSquareShare } from 'lucide-react'

const ScrollableHeader = () => {
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const contactWhatsApp = '00972599043747'
  return (
    <div
      className="hidden border-b-[0.5px] border-muted  lg:block  w-full py-2 "
      lang={i18n.language}
      dir="ltr"
    >
      <div className="page-wrap max-w-[1536px] mx-auto flex items-center justify-between px-4  ">
        <div className="flex items-start gap-2">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>

          <div className="flex items-center gap-3">
        {contactWhatsApp && (
          <a
            href={`https://wa.me/${contactWhatsApp}`}
            target="_blank"
            className="flex items-center gap-4"
          >
            <Badge
              variant="secondary"
              className=" text-sm font-medium py-1 gap-x-2"
            >
              <MessageSquareShare height={15} width={15} />
              {t('Contact us')}
            </Badge>
          </a>
        )}
      </div>
      </div>
    
    </div>
  )
}
export default ScrollableHeader
