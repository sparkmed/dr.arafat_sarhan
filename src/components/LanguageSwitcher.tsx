import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react' // Optional icon

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ar', name: 'العربية' },
]

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const handleValueChange = (value: string) => {
    i18n.changeLanguage(value)
  }

  return (
    <Select value={i18n.language} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[180px]">
        <Globe className="mr-2 h-4 w-4" />
        <SelectValue placeholder="Select Language" />
      </SelectTrigger>
      <SelectContent>
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
