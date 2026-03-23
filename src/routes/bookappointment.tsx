import BookAppointment from '#/components/book-appointemt'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bookappointment')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div>
      <BookAppointment />
    </div>
  )
}
