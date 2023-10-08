import { Elysia, t } from 'elysia'

const articles: Article[] = [
  {
    id: 0,
    author: 'Elysia',
    title: 'Getting Started',
  },
  {
    id: 1,
    author: 'Bun',
    title: 'Bun is a fast JavaScript runtime',
  },
]

const app = new Elysia({ prefix: '/articles' })
  .get('', () => {
    return articles
  })
  .get('/:articleId', ({ params: { articleId } }) => {
    return articles.find(article => article.id === +articleId) || {}
  })
  .post(
    '',
    ({ body }) => {
      return { id: 2, ...body }
    },
    {
      body: t.Object({ title: t.String(), author: t.String() }),
    },
  )
  .patch(
    '/:articleId',
    ({ params: { articleId }, body }) => {
      const updateIndex = articles.findIndex(article => article.id === +articleId)
      if (updateIndex < 0) return {}
      return {
        id: updateIndex,
        title: body.title,
        author: body.author,
      }
    },
    {
      body: t.Object({
        title: t.String(),
        author: t.String(),
      }),
    },
  )
  .delete('/:articleId', ({ params: { articleId } }) => {
    const deleteIndex = articles.findIndex(article => article.id === +articleId)
    if (deleteIndex < 0) return {}

    return { id: +articleId }
  })

app.listen(Bun.env.PORT || 8001, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at ${hostname}:${port}`)
})

export type App = typeof app
