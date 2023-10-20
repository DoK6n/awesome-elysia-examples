import { Elysia } from 'elysia'
import { routes } from './app.route'

const app = new Elysia().use(routes)

app.listen(Bun.env.PORT || 8001, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at ${hostname}:${port}`)
})

export type App = typeof app
