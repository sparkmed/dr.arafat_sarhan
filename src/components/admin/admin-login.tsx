import { useState } from 'react'
import { AlertCircle, LockKeyhole } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '#/components/ui/alert'
import { Button } from '#/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '#/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '#/components/ui/field'
import { Input } from '#/components/ui/input'
import { Spinner } from '#/components/ui/spinner'

export function AdminLogin({
  onSignIn,
  isSigningIn,
}: {
  onSignIn: (passcode: string) => Promise<void>
  isSigningIn: boolean
}) {
  const [passcode, setPasscode] = useState('')
  const [error, setError] = useState<string | null>(null)

  const submit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError(null)
    try {
      await onSignIn(passcode)
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message.replace(/^\[.*?\]\s*/, '')
          : 'Sign in failed.',
      )
      setPasscode('')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <div className="bg-primary/10 text-primary mb-2 flex size-10 items-center justify-center rounded-full">
            <LockKeyhole className="size-5" />
          </div>
          <CardTitle>Content manager</CardTitle>
          <CardDescription>
            Enter the admin passcode to edit the landing page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit}>
            <FieldGroup>
              {error ? (
                <Alert variant="destructive">
                  <AlertCircle />
                  <AlertTitle>Could not sign in</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              ) : null}
              <Field>
                <FieldLabel htmlFor="admin-passcode">Passcode</FieldLabel>
                <Input
                  id="admin-passcode"
                  type="password"
                  dir="ltr"
                  autoFocus
                  autoComplete="current-password"
                  value={passcode}
                  onChange={(event) => setPasscode(event.target.value)}
                />
              </Field>
              <Button
                type="submit"
                disabled={!passcode || isSigningIn}
                className="w-full"
              >
                {isSigningIn ? <Spinner data-icon="inline-start" /> : null}
                {isSigningIn ? 'Signing in…' : 'Sign in'}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
