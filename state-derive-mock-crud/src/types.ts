interface Article {
  id: number
  title: string
  author: string
}

type ArticlesWhereUniqueInput = {
  id: Article['id']
}
type ArticlesFindUniqueArgs = {
  where: ArticlesWhereUniqueInput
}

type ArticlesCreateInput = {
  data: Omit<Article, 'id'>
}

type ArticlesUpdateArgs = {
  data: Omit<Article, 'id'>
  where: ArticlesWhereUniqueInput
}

type ArticlesDeleteArgs = {
  where: ArticlesWhereUniqueInput
}
