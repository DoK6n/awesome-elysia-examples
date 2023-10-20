import { Article } from './types'

export const articles: Article[] = [
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

export const INITIAL_AUTO_INCREMENT = articles.length
