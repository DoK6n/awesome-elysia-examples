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

const INITIAL_AUTO_INCREMENT = 2

const app = new Elysia({ prefix: '/articles' })
  .state('autoIncrement', INITIAL_AUTO_INCREMENT)
  .state('articles', articles)
  .get('', ({ store }) => {
    return store.articles
  })
  .get('/:articleId', ({ params: { articleId }, store }) => {
    return store.articles.find(article => article.id === +articleId) || {}
  })
  .post(
    '',
    ({ body, store }) => {
      store.articles.push({ id: store.autoIncrement, ...body })
      store.autoIncrement++
      return store.articles[store.articles.length - 1]
    },
    {
      body: t.Object({ title: t.String(), author: t.String() }),
    },
  )
  .patch(
    '/:articleId',
    ({ params: { articleId }, body, store }) => {
      const updateIndex = articles.findIndex(article => article.id === +articleId)
      if (updateIndex < 0) return {}
      store.articles[updateIndex].author = body.author
      store.articles[updateIndex].title = body.title

      return store.articles[updateIndex]
    },
    {
      body: t.Object({
        title: t.String(),
        author: t.String(),
      }),
    },
  )
  .delete('/:articleId', ({ params: { articleId }, store }) => {
    const deleteIndex = articles.findIndex(article => article.id === +articleId)
    if (deleteIndex < 0) return {}

    const deletedArticle = { ...store.articles[deleteIndex] }
    if (deletedArticle) {
      store.articles.splice(deleteIndex, 1)
    }
    return { id: deletedArticle.id }
  })

app.listen(Bun.env.PORT || 8001, ({ hostname, port }) => {
  console.log(`🦊 Elysia is running at ${hostname}:${port}`)
})

export type App = typeof app
