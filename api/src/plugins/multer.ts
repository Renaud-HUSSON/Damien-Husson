import fp from 'fastify-plugin'
import multer from 'fastify-multer'

export default fp(async (fastify, _opts) => {
  fastify.register(multer.contentParser)
})
