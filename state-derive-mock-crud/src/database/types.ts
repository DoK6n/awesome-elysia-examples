export interface Article {
  id: number
  title: string
  author: string
}

export type ArticlesWhereUniqueInput = {
  id: Article['id']
}

export type ArticlesFindUniqueArgs = {
  where: ArticlesWhereUniqueInput
}

export type ArticlesCreateInput = {
  data: Omit<Article, 'id'>
}

export type ArticlesUpdateArgs = {
  data: Omit<Article, 'id'>
  where: ArticlesWhereUniqueInput
}

export type ArticlesDeleteArgs = {
  where: ArticlesWhereUniqueInput
}

export interface DbClient<ReturnData> {
  findMany: () => Promise<ReturnData[]>
  findUnique: (args: ArticlesFindUniqueArgs) => Promise<ReturnData | {}>
  create: (input: ArticlesCreateInput) => Promise<ReturnData>
  update: (args: ArticlesUpdateArgs) => Promise<ReturnData | {}>
  delete: (args: ArticlesDeleteArgs) => Promise<{ id?: number }>
}
