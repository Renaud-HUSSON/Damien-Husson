import fp from 'fastify-plugin'
import db from '../config/Database'
import { authController } from '../controllers/AuthController'

export default fp(async (fastify) => {
  const { authenticated } = authController(db, fastify)

  fastify.decorate('auth', authenticated)
})
