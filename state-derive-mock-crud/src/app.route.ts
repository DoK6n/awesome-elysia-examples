import Elysia from 'elysia'
import { articlesRoute } from './services/articles'

export const routes = new Elysia({ name: 'routes', prefix: '/api' }).use(articlesRoute)
