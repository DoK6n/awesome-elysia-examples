import Elysia from 'elysia'
import { Article, DbClient, dbClient } from '../../../database'

interface IArticlesRepository {
  getArticles: () => Promise<Article[]>
  insertArticle: (articleToCreate: Omit<Article, 'id'>) => Promise<Article>
  getArticleById: (id: number) => Promise<Article | {}>
  updateArticleById: (
    id: number,
    articleToEdit: Omit<Article, 'id'>,
  ) => Promise<Article | {}>
  deleteArticleById: (id: number) => Promise<{ id?: number }>
}

export class ArticlesRepository implements IArticlesRepository {
  constructor(private readonly db: DbClient<Article>) {}

  async getArticles() {
    return await this.db.findMany()
  }

  async insertArticle(articleToCreate: Omit<Article, 'id'>) {
    return await this.db.create({
      data: articleToCreate,
    })
  }

  async getArticleById(id: number) {
    return await this.db.findUnique({
      where: {
        id,
      },
    })
  }

  async updateArticleById(id: number, articleToEdit: Omit<Article, 'id'>) {
    return await this.db.update({
      where: { id },
      data: articleToEdit,
    })
  }

  async deleteArticleById(id: number) {
    return await this.db.delete({
      where: { id },
    })
  }
}

export const articlesRepository = new Elysia({
  name: 'articlesRepository',
})
  .use(dbClient)
  .derive(({ dbClient }) => ({
    articlesRepository: new ArticlesRepository(dbClient),
  }))
