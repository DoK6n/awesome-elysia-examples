import Elysia from 'elysia'
import { Article, DbClient } from '../../database'
import { ArticlesRepository, articlesRepository } from './repositories'

interface IArticlesService {
  fetchArticles: () => Promise<Article[]>
  createArticle: (articleToCreate: Omit<Article, 'id'>) => Promise<Article>
  fetchArticleById: (id: number) => Promise<Article | {}>
  editArticleById: (
    id: number,
    articleToEdit: Omit<Article, 'id'>,
  ) => Promise<Article | {}>
  removeArticleById: (id: number) => Promise<{ id?: number }>
}

export class ArticlesService implements IArticlesService {
  constructor(private readonly articlesRepository: ArticlesRepository) {}

  async fetchArticles() {
    return await this.articlesRepository.getArticles()
  }

  async createArticle(articleToCreate: Omit<Article, 'id'>) {
    return await this.articlesRepository.insertArticle(articleToCreate)
  }

  async fetchArticleById(id: number) {
    return await this.articlesRepository.getArticleById(id)
  }

  async editArticleById(id: number, articleToEdit: Omit<Article, 'id'>) {
    return await this.articlesRepository.updateArticleById(id, articleToEdit)
  }

  async removeArticleById(id: number) {
    return await this.articlesRepository.deleteArticleById(id)
  }
}

export const articlesService = new Elysia({
  name: 'articlesService',
})
  .use(articlesRepository)
  .derive(({ articlesRepository }) => ({
    articlesService: new ArticlesService(articlesRepository),
  }))
