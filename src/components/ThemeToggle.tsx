import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

type ThemeMode = 'light' | 'dark' | 'auto'

function getInitialMode(): ThemeMode {
  if (typeof window === 'undefined') return 'auto'
  const stored = window.localStorage.getItem('theme')
  return (stored as ThemeMode) || 'auto'
}

function applyThemeMode(mode: ThemeMode) {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
  const resolved = mode === 'auto' ? (prefersDark ? 'dark' : 'light') : mode

  document.documentElement.classList.remove('light', 'dark')
  document.documentElement.classList.add(resolved)
  document.documentElement.style.colorScheme = resolved

  if (mode !== 'auto') {
    document.documentElement.setAttribute('data-theme', mode)
  } else {
    document.documentElement.removeAttribute('data-theme')
  }
}

export default function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(getInitialMode())

  // Initial Apply
  useEffect(() => {
    applyThemeMode(mode)
  }, [mode])

  // System Preference Listener
  useEffect(() => {
    if (mode !== 'auto') return
    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyThemeMode('auto')
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode])

  const handleValueChange = (nextMode: ThemeMode) => {
    setMode(nextMode)
    window.localStorage.setItem('theme', nextMode)
  }

  return (
    <Select value={mode} onValueChange={handleValueChange}>
      <SelectTrigger className="w-[130px] rounded-full border-[var(--chip-line)] bg-[var(--chip-bg)] text-[var(--sea-ink)] shadow-sm">
        <div className="flex items-center gap-2">
          <SelectValue placeholder="Theme" />
        </div>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">
          <div className="flex items-center gap-2">
            <Sun className="h-4 w-4" /> <span>Light</span>
          </div>
        </SelectItem>
        <SelectItem value="dark">
          <div className="flex items-center gap-2">
            <Moon className="h-4 w-4" /> <span>Dark</span>
          </div>
        </SelectItem>
        <SelectItem value="auto">
          <div className="flex items-center gap-2">
            <Monitor className="h-4 w-4" /> <span>System</span>
          </div>
        </SelectItem>
      </SelectContent>
    </Select>
  )
}
