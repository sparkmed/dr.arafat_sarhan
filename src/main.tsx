import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { ConvexProvider, ConvexReactClient } from 'convex/react'
import { routeTree } from './routeTree.gen'
import React from 'react'

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
      {/* Wrap the router with ConvexProvider */}
      <ConvexProvider client={convex}>
        <RouterProvider router={router} />
      </ConvexProvider>
    </React.StrictMode>,
  )
}
