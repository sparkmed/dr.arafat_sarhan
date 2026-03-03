import { useEffect, useState } from 'react'
import { Monitor, Moon, Sun } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {/* h-12 w-12 matches your language button size */}
        <Button variant="ghost" className="h-10 w-10 rounded-full p-0">
          {mode === 'light' && <Sun className="!size-6" />}
          {mode === 'dark' && <Moon className="!size-6" />}
          {mode === 'auto' && <Monitor className="!size-6" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleValueChange('light')}>
          <Sun className="mr-2 h-4 w-4" /> <span>Light</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleValueChange('dark')}>
          <Moon className="mr-2 h-4 w-4" /> <span>Dark</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleValueChange('auto')}>
          <Monitor className="mr-2 h-4 w-4" /> <span>System</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
