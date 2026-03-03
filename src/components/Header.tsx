import ThemeToggle from './ThemeToggle'
import { LanguageSwitcher } from './LanguageSwitcher'
import ScrollableHeader from './Header/ScrollableHeader'

export default function Header() {
  return (
    <header className=" z-50 border-b border-[var(--line)] bg-[var(--header-bg)] w-screen backdrop-blur-lg">
      <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 py-3 sm:py-4">
          <ScrollableHeader />
      </nav>
    </header>
  )
}
