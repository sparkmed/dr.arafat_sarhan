import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  PhoneForwarded,
} from 'lucide-react'
import { Button } from '../ui/button'
import { useSection } from '#/hooks/use-site-content'

const telHref = (value: string) => `tel:${value.replace(/[^\d+]/g, '')}`

const Footer = () => {
  const { data, t } = useSection('footer')

  if (!data.enabled) return null

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
                  src={data.logoDark}
                  alt="Logo"
                  className=" hidden dark:block drop-shadow-[0_0_2px_rgba(0,0,0,0.6)]"
                />
                <img
                  src={data.logoLight}
                  alt="Logo"
                  className="drop-shadow-[0_0_2px_rgba(0,0,0,0.6)] dark:hidden"
                />
              </a>
            </Button>
            <p className="  text-muted-foreground text-base max-w-sm mb-3">
              {t(data.description)}
            </p>
          </div>
          <div className="flex flex-col gap-2 lg:items-start">
            <h3 className="font-bold text-2xl text-foreground ">
              {t(data.contactTitle)}
            </h3>
            <ul className="space-y-4 text-muted-foreground pt-3">
              <li className="flex items-center gap-3 lg:justify-start">
                <a
                  href={telHref(data.phonePrimary)}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Phone className="size-5 text-primary" />
                  <span dir="ltr" className="text-sm">
                    {data.phonePrimary}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 lg:justify-start">
                <a
                  href={telHref(data.phoneSecondary)}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <PhoneForwarded className="size-5 text-primary group-hover:scale-110 transition-transform" />
                  <span dir="ltr" className="text-sm">
                    {data.phoneSecondary}
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 lg:justify-start">
                <a
                  href={`mailto:${data.email}`}
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <Mail className="size-5 text-primary" />
                  <span className="text-sm">{data.email}</span>
                </a>
              </li>
              <li className="flex items-center gap-3 lg:justify-start">
                <a
                  href={data.addressUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-primary transition-colors"
                >
                  <MapPin className="size-5 text-primary" />
                  <span className="text-sm">{t(data.address)}</span>
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-1 mt-4">
            <h3 className="font-bold text-xl text-foreground">
              {t(data.followTitle)}
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
                  href={data.instagramUrl}
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
                  href={data.facebookUrl}
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
                <a href={`mailto:${data.email}`}>
                  <Mail className="size-5" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--line)] py-4">
        <div className="page-wrap mx-auto px-6 flex justify-between items-center">
          <p className="text-sm text-muted-foreground">Powered by SparkMed</p>
          <p className="text-sm text-muted-foreground">
            &copy; 2026 {t(data.rights)}
          </p>
        </div>
      </div>
    </footer>
  )
}
export default Footer
