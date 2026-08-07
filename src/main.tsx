import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { routeTree } from './routeTree.gen'
import './i18n'
import React from 'react'
import { ThemeProvider } from '@/components/theme-provider'

const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
})

const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL)

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('app')!

if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <React.StrictMode>
      <ConvexProvider client={convex}>
        <ThemeProvider defaultTheme="system" storageKey="theme">
          <React.Suspense fallback="Loading translations...">
            <RouterProvider router={router} />
          </React.Suspense>
        </ThemeProvider>
      </ConvexProvider>
    </React.StrictMode>,
  )
}
