import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react' // Optional icon

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()


  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" size="icon" className="h-10 w-10 rounded-sm p-0 [&_svg]:size-6">
          <Globe className="!size-6" />
          <span className="sr-only">Toggle language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => i18n.changeLanguage(lang.code)}
            className={i18n.language === lang.code ? 'bg-accent' : ''}
          >
            {lang.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
