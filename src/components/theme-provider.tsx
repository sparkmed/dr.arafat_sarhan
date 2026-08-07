import { createContext, useContext, useEffect, useState } from 'react'

export type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

// 'auto' was the previous name for 'system'. Map it so visitors who already
// picked a mode keep it instead of landing on an unrecognised class name.
// Keep in sync with the pre-paint script in index.html.
function normalizeStoredTheme(value: string | null): Theme | null {
  if (value === 'auto' || value === 'system') return 'system'
  if (value === 'light' || value === 'dark') return value
  return null
}

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    try {
      return normalizeStoredTheme(localStorage.getItem(storageKey)) ?? defaultTheme
    } catch {
      return defaultTheme
    }
  })

  useEffect(() => {
    const root = window.document.documentElement
    const resolved =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : theme

    root.classList.remove('light', 'dark')
    root.classList.add(resolved)
    // The pre-paint script sets this inline before React mounts. It has to be
    // updated here too, or that stale value outranks the color-scheme rules in
    // styles.css and the browser keeps rendering the old scheme.
    root.style.colorScheme = resolved
  }, [theme])

  const value = {
    theme,
    setTheme: (nextTheme: Theme) => {
      try {
        localStorage.setItem(storageKey, nextTheme)
      } catch {
        // Storage can be unavailable (private mode, blocked cookies); the theme
        // still applies for this session.
      }
      setTheme(nextTheme)
    },
  }

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeProviderContext)
