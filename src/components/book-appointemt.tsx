import { useMutation } from 'convex/react'
import { api } from '../../convex/_generated/api'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Link } from '@tanstack/react-router'
import { ChevronLeft, Loader2 } from 'lucide-react'

// Shadcn UI Imports
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// 1. Define validation schema
const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service"),
  date: z.string().min(1, "Please select a date"),
})

const BookAppointment = () => {
  const sendAppointment = useMutation(api.appointments.create)
  
  // 2. Initialize form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      service: "",
      date: "",
    },
  })

  // 3. Handle Submit
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await sendAppointment(values)
      alert("Appointment requested successfully!")
      form.reset()
    } catch (error) {
      console.error("Failed to book:", error)
    }
  }

  const isLoading = form.formState.isSubmitting

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background p-4">
      {/* Back Button */}
      <div className="w-full max-w-md mb-6">
        <Button variant="ghost" asChild className="gap-2">
          <Link to="/">
            <ChevronLeft className="h-4 w-4" /> Back to Home
          </Link>
        </Button>
      </div>

      <div className="w-full max-w-md bg-card border border-border p-8 rounded-[2rem] shadow-xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Book Appointment</h1>
          <p className="text-muted-foreground mt-2">Fill in your details to secure your spot.</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            
            {/* Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Dr. Arafat Sarhan" {...field} className="rounded-xl" />
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
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="05x xxx xxxx" {...field} className="rounded-xl" />
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
                  <FormLabel>Service</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="rounded-xl">
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="general">General Dentistry</SelectItem>
                      <SelectItem value="implant">Dental Implants</SelectItem>
                      <SelectItem value="ortho">Orthodontics</SelectItem>
                      <SelectItem value="cosmetic">Cosmetic Dentistry</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Date Field (Simple Input for now) */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preferred Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} className="rounded-xl" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full rounded-full h-12 text-base font-bold transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Request Appointment"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}

export default BookAppointment