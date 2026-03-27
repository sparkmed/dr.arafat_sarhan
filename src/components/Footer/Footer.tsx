import { useTranslation } from 'react-i18next'
import { Button } from '../ui/button'
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  PhoneForwarded,
  Send,
} from 'lucide-react'
const darklogoURL =
  'https://marvelous-fish-345.convex.cloud/api/storage/9d521bf6-d1e5-4138-b9d2-abe3173c7b86'

const lightLogoURL =
  'https://marvelous-fish-345.convex.cloud/api/storage/bee39baa-a87f-4a8d-9ece-8ebd42041c24'
const Footer = () => {
  const { t } = useTranslation()
  return (
    <footer className="w-full mt-auto backdrop-blur-sm ">
      <div className="page-wrap mx-auto py-12 px-6">
        <div className="flex flex-col lg:flex-row gap-2 items-start justify-between w-full ">
          <div className="flex flex-col items-start justify-start gap-y-12">
            <Button
              asChild
              className="w-80 h-16 rounded-sm relative overflow-hidden "
              variant="ghost"
            >
              <a href="/">
                <img
                  src={darklogoURL}
                  alt="Logo"
                  className=" hidden dark:block drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]"
                />
                <img
                  src={lightLogoURL}
                  alt="Logo"
                  className="drop-shadow-[0_0_2px_rgba(0,0,0,0.6)] dark:hidden"
                />
              </a>
            </Button>
            <p className="  text-muted-foreground text-base max-w-sm mb-3">
              {t('footer.description')}
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:items-start">
            <h3 className="font-bold text-2xl text-foreground ">
              {t('footer.contactUs')}
            </h3>
            <ul className="space-y-4 text-muted-foreground pt-3">
              <li className="flex items-center gap-3 lg:justify-start">
                <a
                  href="tel:+972599888009"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Phone className="size-5 text-primary" />
                  <span dir="ltr" className="text-sm">
                    +970597559922
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 lg:justify-start">
                <a
                  href="tel:+972599888009"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <PhoneForwarded className="size-5 text-primary group-hover:scale-110 transition-transform" />
                  <span dir="ltr" className="text-sm">
                    022989520
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 lg:justify-start">
                <a
                  href="mailto:info@drarafatsarhan.com"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Mail className="size-5 text-primary" />
                  <span className="text-sm">info@drarafatsarhan.com</span>
                </a>
              </li>
              <li className="flex items-center gap-3 lg:justify-start">
                <a
                  href="https://maps.google.com/?cid=10643237726814099851&g_mp=Cidnb29nbGUubWFwcy5wbGFjZXMudjEuUGxhY2VzLlNlYXJjaFRleHQ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <MapPin className="size-5 text-primary" />
                  <span className="text-sm">
                    {' '}
                    Ramallah, Al-Irsal St, Al-Israa Building
                  </span>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <h3 className="font-bold text-xl text-foreground">
              {t('footer.followUs')}
            </h3>
            <div className="flex items-center gap-4 pt-2">
              {/* Instagram */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:text-primary transition-colors"
                asChild
              >
                <a
                  href="https://www.instagram.com/drarafatsarhan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="size-5" />
                </a>
              </Button>

              {/* Facebook */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:text-primary transition-colors"
                asChild
              >
                <a
                  href="https://www.facebook.com/DrArafatSarhan"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook className="size-5" />
                </a>
              </Button>

              {/* Email */}
              <Button
                variant="outline"
                size="icon"
                className="rounded-full hover:text-primary transition-colors"
                asChild
              >
                <a href="mailto:info@drarafatsarhan.com">
                  <Mail className="size-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=" border-t border-[var(--line)] py-4">
        <div className="page-wrap mx-auto px-6 flex justify-between items-center">
          <p className=" text-sm text-muted-foreground">@2026</p>
          <p className=" text-sm text-muted-foreground">
            &copy; {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
