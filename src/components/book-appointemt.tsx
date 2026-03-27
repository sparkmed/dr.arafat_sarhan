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
                  <FormMessage className="text-red-600 dark:text-red-400" />
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
                  <FormMessage className="text-red-600 dark:text-red-400" />
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
                  <FormMessage className="text-red-600 dark:text-red-400" />
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
                  <FormMessage className="text-red-600 dark:text-red-400" />
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
          className="flex flex-col w-full sm:max-w-md border-none bg-background/95 backdrop-blur-md"
        >
          {/* الزخرفة العلوية - تعطي لمسة جمالية */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent" />

          <SheetHeader className="text-center flex flex-col items-center pt-12">
            {/* أيقونة علامة الصح مع حركة زووم */}
            <div className="relative mb-6">
              <div className="absolute inset-0 bg-green-500/20 rounded-full animate-ping duration-[2000ms]" />
              <div className="relative h-20 w-20 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/20">
                <CheckCircle2 className="h-12 w-12 text-white" />
              </div>
            </div>

            <SheetTitle className="text-2xl font-bold tracking-tight text-foreground">
              {isRTL ? 'تم استلام طلبك بنجاح!' : 'Request Sent Successfully!'}
            </SheetTitle>

            <p className="text-muted-foreground text-sm px-6">
              {isRTL
                ? 'شكراً لثقتك بنا. لقد تم حفظ بيانات موعدك في نظامنا.'
                : 'Thank you for choosing us. Your appointment details have been saved.'}
            </p>
          </SheetHeader>

          <div className="flex-1 py-10 px-2">
            {/* بطاقة الرسالة الأساسية */}
            <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6 space-y-3">
              <div className="flex items-center gap-3 text-green-600 dark:text-green-400">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  {isRTL ? 'الخطوة القادمة' : 'Next Step'}
                </span>
              </div>

              <p className="text-foreground font-medium leading-relaxed">
                {isRTL
                  ? 'سقوم بالتواصل معك في أقرب وقت ممكن لتأكيد موعدك النهائي.'
                  : 'We will contact you as soon as possible to confirm your appointment.'}
              </p>
            </div>

            {/* نصائح إضافية بسيطة */}
            <p className="mt-6 text-center text-xs text-muted-foreground italic">
              {isRTL
                ? 'يرجى إبقاء هاتفك متاحاً للرد على مكالمتنا.'
                : 'Please keep your phone reachable for our call.'}
            </p>
          </div>

          <SheetFooter className="mt-auto pb-8">
            <SheetClose asChild>
              <Button className="w-full rounded-2xl h-14 text-lg font-bold shadow-lg shadow-primary/20 transition-all active:scale-95">
                {isRTL ? 'فهمت، إغلاق' : 'Got it, Close'}
              </Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default BookAppointment
