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
  .derive(({ store }) => ({
    db: {
      findMany: async () => store.articles,
      findUnique: async (args: ArticlesFindUniqueArgs) => {
        return store.articles.find(article => article.id === args.where.id) || {}
      },
      create: async (input: ArticlesCreateInput) => {
        store.articles.push({ id: store.autoIncrement, ...input.data })
        store.autoIncrement++
        return store.articles[store.articles.length - 1]
      },
      update: async (args: ArticlesUpdateArgs) => {
        const updateIndex = store.articles.findIndex(article => article.id === args.where.id)
        if (updateIndex < 0) return {}

        store.articles[updateIndex].author = args.data.author
        store.articles[updateIndex].title = args.data.title
        return store.articles[updateIndex]
      },
      delete: async (args: ArticlesDeleteArgs) => {
        const deleteIndex = store.articles.findIndex(article => article.id === args.where.id)
        if (deleteIndex < 0) return {}

        const deletedArticle = { ...store.articles[deleteIndex] }
        if (deletedArticle) {
          store.articles.splice(deleteIndex, 1)
        }
        return { id: deletedArticle.id }
      },
    },
  }))
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
