import { Elysia, t } from 'elysia'
import { db } from './db.plugin'

const app = new Elysia({ prefix: '/articles' })
  .use(db)
  .get('', async ({ db }) => {
    return await db.findMany()
  })
  .get('/:articleId', async ({ params: { articleId }, db }) => {
    return await db.findUnique({
      where: {
        id: +articleId,
      },
    })
  })
  .post(
    '',
    async ({ body, db }) => {
      return await db.create({
        data: body,
      })
    },
    {
      body: t.Object({ title: t.String(), author: t.String() }),
    },
  )
  .patch(
    '/:articleId',
    async ({ params: { articleId }, body, db }) => {
      return await db.update({
        where: { id: +articleId },
        data: body,
      })
    },
    {
      body: t.Object({
        title: t.String(),
        author: t.String(),
      }),
    },
  )
  .delete('/:articleId', async ({ params: { articleId }, db }) => {
    return await db.delete({
      where: { id: +articleId },
    })
  })

app.listen(Bun.env.PORT || 8001, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at ${hostname}:${port}`)
})

export type App = typeof app
