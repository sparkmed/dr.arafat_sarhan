import BookAppointment from '#/components/book-appointemt'
import Header from '#/components/Header/Header'
import { BokehBackground } from '#/components/ui/bokeh'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bookappointment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="relative grow">
        <div className="relative z-10 px-4 py-8">
          <BookAppointment />
        </div>
      </main>
    </div>
  )
}
