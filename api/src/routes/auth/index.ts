import { FastifyInstance } from 'fastify'
import db from '../../config/Database'
import { UtilisateursController } from '../../controllers/AuthController'
import PostLoginResponseSchema from '../../schemas/auth/post_login_response.json'
import ErrorResponseSchema from '../../schemas/error_response.json'
import PostLoginBodySchema from '../../schemas/auth/post_login_body.json'
import GetAuthenticatedSuccessResponseSchema from '../../schemas/auth/get_authenticated_success_response.json'

const authRoutes = async (fastify: FastifyInstance) => {
  const { login, authenticated, logout } = UtilisateursController(db, fastify)

  fastify.post(
    '/login',
    {
      schema: {
        body: PostLoginBodySchema,
        response: {
          '2xx': PostLoginResponseSchema,
          '4xx': ErrorResponseSchema,
          '5xx': ErrorResponseSchema,
        },
      },
    },
    login
  )

  fastify.get(
    '/authenticated',
    {
      schema: {
        response: {
          '2xx': GetAuthenticatedSuccessResponseSchema,
          '4xx': ErrorResponseSchema,
          '5xx': ErrorResponseSchema,
        },
      },
    },
    authenticated
  )

  fastify.get('/logout', logout)
}

export default authRoutes
