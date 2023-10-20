import Elysia from 'elysia'
import {
  Article,
  ArticlesCreateInput,
  ArticlesDeleteArgs,
  ArticlesFindUniqueArgs,
  ArticlesUpdateArgs,
  DbClient,
} from './types'
import { INITIAL_AUTO_INCREMENT, articles } from './data'

const makeDbClient = (store: {
  autoIncrement: number
  articles: Article[]
}): DbClient<Article> => ({
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
    const updateIndex = store.articles.findIndex(
      article => article.id === args.where.id,
    )
    if (updateIndex < 0) return {}

    store.articles[updateIndex].author = args.data.author
    store.articles[updateIndex].title = args.data.title
    return store.articles[updateIndex]
  },
  delete: async (args: ArticlesDeleteArgs) => {
    const deleteIndex = store.articles.findIndex(
      article => article.id === args.where.id,
    )
    if (deleteIndex < 0) return {}

    const deletedArticle = { ...store.articles[deleteIndex] }
    if (deletedArticle) {
      store.articles.splice(deleteIndex, 1)
    }
    return { id: deletedArticle.id }
  },
})

export const dbClient = new Elysia()
  .state('autoIncrement', INITIAL_AUTO_INCREMENT)
  .state('articles', articles)
  .derive(({ store }) => ({
    dbClient: makeDbClient(store),
  }))
