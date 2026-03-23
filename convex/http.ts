import { httpRouter } from 'convex/server'
import { httpAction } from './_generated/server'
import { api } from './_generated/api'

const http = httpRouter()

http.route({
  path: '/post-appointment',
  method: 'POST',
  handler: httpAction(async (ctx, request) => {
    const body = await request.json()

    await ctx.runMutation(api.appointments.create, {
      name: body.name,
      phone: body.phone,
      service: body.service,
      date: body.date,
    })

    return new Response(null, { status: 200 })
  }),
})

export default http
