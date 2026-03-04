import ThemeToggle from '../ThemeToggle'
import { LanguageSwitcher } from '../LanguageSwitcher'
import ScrollableHeader from './ScrollableHeader'
import StickyHeader from './StickyHeader'

export default function Header() {
  return (
    <>
        <ScrollableHeader />
        <StickyHeader />
        </>
    // <header className=" z-50 border-b border-[var(--line)] bg-[var(--header-bg)] w-screen ">
    //   <nav className="page-wrap flex flex-wrap items-center gap-x-3 gap-y-2 ">
    //   </nav>
    // </header>
  )
}
