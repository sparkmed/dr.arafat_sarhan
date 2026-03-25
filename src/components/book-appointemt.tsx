import { useState } from 'react'
import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2, CheckCircle2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'

// Shadcn UI Imports
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from '@/components/ui/sheet'

const BookAppointment = () => {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language.startsWith('ar')
  const [isSuccessOpen, setIsSuccessOpen] = useState(false)
  const sendAppointment = useMutation(api.appointments.create)

  // 1. Validation schema
  const formSchema = z.object({
    name: z.string().min(2, t('appointment.validation.name')),
    phone: z.string().min(10, t('appointment.validation.phone')),
    service: z.string().min(1, t('appointment.validation.service')),
    date: z.string().min(1, t('appointment.validation.date')),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: '', phone: '', service: '', date: '' },
  })

  // 2. Handle Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await sendAppointment(values)
      setIsSuccessOpen(true) // Open the success sheet
      form.reset()
    } catch (error) {
      console.error(t('appointment.error'), error)
    }
  }

  const isLoading = form.formState.isSubmitting

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-background p-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="w-full max-w-md bg-card border border-border p-8 rounded-[2rem] shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">
            {t('appointment.title')}
          </h1>
          <p className="text-muted-foreground mt-2">
            {t('appointment.description')}
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('appointment.labelName')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('appointment.placeholderName')}
                      {...field}
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('appointment.labelPhone')}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t('appointment.placeholderPhone')}
                      {...field}
                      className="rounded-xl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Service Selection */}
            <FormField
              control={form.control}
              name="service"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('appointment.labelService')}</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="rounded-xl w-full">
                        <SelectValue
                          placeholder={t('appointment.placeholderService')}
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">
                        {t('appointment.services.general')}
                      </SelectItem>
                      <SelectItem value="implant">
                        {t('appointment.services.implant')}
                      </SelectItem>
                      <SelectItem value="ortho">
                        {t('appointment.services.ortho')}
                      </SelectItem>
                      <SelectItem value="cosmetic">
                        {t('appointment.services.cosmetic')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Field */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('appointment.labelDate')}</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full rounded-full h-12 text-base font-bold transition-all bg-primary hover:opacity-90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {t('appointment.btnProcessing')}
                </>
              ) : (
                t('appointment.btnSubmit')
              )}
            </Button>
          </form>
        </Form>
      </div>

      {/* Success Sheet Modal */}
      <Sheet open={isSuccessOpen} onOpenChange={setIsSuccessOpen}>
        <SheetContent
          side={isRTL ? 'left' : 'right'}
          className="flex flex-col sm:max-w-md"
        >
          <SheetHeader className="text-center sm:text-center flex flex-col items-center pt-10">
            <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <CheckCircle2 className="h-10 w-10 text-primary animate-in zoom-in duration-300" />
            </div>
            <SheetTitle className="text-2xl">
              {t('appointment.successTitle') || 'Thank You!'}
            </SheetTitle>
          </SheetHeader>

          <div className="py-6">
            <Alert className="border-primary/20 bg-primary/5">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <AlertTitle className="font-bold">
                {t('appointment.alertTitle') || 'Request Received'}
              </AlertTitle>
              <AlertDescription>
                {t('appointment.alertDesc') ||
                  'Your details have been saved successfully. We will call you soon.'}
              </AlertDescription>
            </Alert>
          </div>

          <SheetFooter className="mt-auto">
            <SheetClose asChild>
              <Button className="w-full rounded-full h-12">
                {isRTL ? 'إغلاق' : 'Close'}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default BookAppointment
