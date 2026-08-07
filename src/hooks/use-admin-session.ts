import { useAction, useMutation, useQuery } from 'convex/react'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../convex/_generated/api'
import { clearSession, readSession, writeSession } from '#/lib/admin-session'

export function useAdminSession() {
  const [token, setToken] = useState<string | null>(
    () => readSession()?.token ?? null,
  )
  const [isSigningIn, setIsSigningIn] = useState(false)

  // Confirms the stored token server-side; `undefined` while in flight.
  const isValid = useQuery(api.admin.isSessionValid, {
    token: token ?? undefined,
  })
  const loginAction = useAction(api.admin.login)
  const logoutMutation = useMutation(api.admin.logout)

  const signIn = useCallback(
    async (passcode: string) => {
      setIsSigningIn(true)
      try {
        const session = await loginAction({ passcode })
        writeSession(session)
        setToken(session.token)
      } finally {
        setIsSigningIn(false)
      }
    },
    [loginAction],
  )

  const signOut = useCallback(async () => {
    const current = token
    clearSession()
    setToken(null)
    if (current) {
      try {
        await logoutMutation({ token: current })
      } catch {
        // The local session is already gone; a failed revoke is not worth
        // blocking the user on.
      }
    }
  }, [logoutMutation, token])

  // A token the server rejects (expired, or revoked elsewhere) is dead weight.
  useEffect(() => {
    if (token && isValid === false) {
      clearSession()
      setToken(null)
    }
  }, [token, isValid])

  return {
    token,
    isAuthenticated: !!token && isValid === true,
    isChecking: !!token && isValid === undefined,
    isSigningIn,
    signIn,
    signOut,
  }
}
