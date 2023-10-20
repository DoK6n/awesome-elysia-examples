import Elysia, { t } from 'elysia'
import { articlesService } from './articles.service'

export namespace ArticlesController {
  /**
   * 새로운 article을 저장합니다.
   */
  export const createArticle = new Elysia({ name: 'createArticle' })
    .use(articlesService)
    .post(
      '',
      async ({ body, articlesService }) => {
        const createdArticle = await articlesService.createArticle(body)
        return {
          data: createdArticle,
        }
      },
      {
        body: t.Object({ title: t.String(), author: t.String() }),
      },
    )

  /**
   * 모든 article을 가져옵니다.
   */
  export const getArticles = new Elysia({ name: 'getArticles' })
    .use(articlesService)
    .get('', async ({ articlesService }) => {
      const foundArticles = await articlesService.fetchArticles()
      return {
        data: foundArticles,
      }
    })

  /**
   * 하나의 article을 가져옵니다.
   */
  export const getArticleById = new Elysia({ name: 'getArticleById' })
    .use(articlesService)
    .get(
      '/:articleId',
      async ({ params: { articleId }, articlesService }) => {
        const retrievedArticle = await articlesService.fetchArticleById(
          articleId,
        )

        return {
          data: retrievedArticle || {},
        }
      },
      {
        params: t.Object({
          articleId: t.Numeric(),
        }),
      },
    )

  /**
   * 하나의 article를 수정합니다.
   */
  export const editArticleById = new Elysia({ name: 'editArticleById' })
    .use(articlesService)
    .patch(
      '/:articleId',
      async ({ params: { articleId }, body, articlesService }) => {
        const editedArticle = await articlesService.editArticleById(
          articleId,
          body,
        )

        return {
          data: editedArticle,
        }
      },
      {
        body: t.Object({
          title: t.String(),
          author: t.String(),
        }),
        params: t.Object({
          articleId: t.Numeric(),
        }),
      },
    )

  /**
   * 하나의 article을 삭제합니다.
   */
  export const removeArticleById = new Elysia({ name: 'removeArticleById' })
    .use(articlesService)
    .delete(
      '/:articleId',
      async ({ params: { articleId }, articlesService }) => {
        const deletedArticleId = await articlesService.removeArticleById(
          articleId,
        )

        return {
          data: {
            id: deletedArticleId.id,
          },
        }
      },
      {
        params: t.Object({
          articleId: t.Numeric(),
        }),
      },
    )
}
