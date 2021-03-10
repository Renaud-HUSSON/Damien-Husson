import { onRequestHookHandler } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    auth: onRequestHookHandler
  }
}
