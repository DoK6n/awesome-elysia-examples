import Elysia from 'elysia'
import { ArticlesController } from './articles.controller'

export const articlesRoute = new Elysia({
  name: 'articles',
  prefix: '/articles',
})
  .use(ArticlesController.getArticles)
  .use(ArticlesController.createArticle)
  .use(ArticlesController.getArticleById)
  .use(ArticlesController.editArticleById)
  .use(ArticlesController.removeArticleById)
