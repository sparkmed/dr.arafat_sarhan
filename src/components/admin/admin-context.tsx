import { createContext, useContext } from 'react'

const AdminTokenContext = createContext<string | null>(null)

export function AdminTokenProvider({
  token,
  children,
}: {
  token: string
  children: React.ReactNode
}) {
  return (
    <AdminTokenContext.Provider value={token}>
      {children}
    </AdminTokenContext.Provider>
  )
}

/** The live admin session token, for upload actions and content mutations. */
export function useAdminToken() {
  return useContext(AdminTokenContext)
}
