import { FastifyInstance } from 'fastify'
import db from '../../config/Database'
import GetQueryStringSchema from '../../schemas/get_querystring.json'
import CategorieSchema from '../../schemas/categories/categorie.json'
import CategoriesController from '../../controllers/CategorieController'
import ErrorResponseSchema from '../../schemas/error_response.json'
import CompetenceGetSuccessResponseSchema from '../../schemas/categories/categorie_get_success_reseponse.json'
import CategoriePostSuccessResponseSchema from '../../schemas/categories/categorie_post_success_response.json'
import CategoriePostPatchBodySchema from '../../schemas/categories/categorie_post_patch_body.json'
import ParamsSchema from '../../schemas/params.json'
import PatchSuccessResponseSchema from '../../schemas/patch_success_response.json'
import DeleteSuccessResponseSchema from '../../schemas/delete_success_response.json'
import DeleteQuerystringSchema from '../../schemas/delete_querystring.json'

const CategoriesRoute = async (fastify: FastifyInstance) => {
  const {
    findAll,
    findById,
    create,
    update,
    deleteById,
  } = CategoriesController(db, fastify)

  fastify.addSchema(CategorieSchema)

  fastify.get(
    '/',
    {
      schema: {
        querystring: GetQueryStringSchema,
        response: {
          '2xx': CompetenceGetSuccessResponseSchema,
          '4xx': ErrorResponseSchema,
          '5xx': ErrorResponseSchema,
        },
      },
    },
    findAll
  )

  fastify.get(
    '/:id',
    {
      schema: {
        response: {
          '4xx': ErrorResponseSchema,
          '5xx': ErrorResponseSchema,
        },
      },
    },
    findById
  )

  fastify.register(async (fastify, _options) => {
    fastify.addHook('onRequest', fastify.auth)

    fastify.post(
      '/',
      {
        schema: {
          body: CategoriePostPatchBodySchema,
          response: {
            '2xx': CategoriePostSuccessResponseSchema,
            '5xx': ErrorResponseSchema,
          },
        },
      },
      create
    )

    fastify.patch(
      '/:id',
      {
        schema: {
          body: CategoriePostPatchBodySchema,
          params: ParamsSchema,
          response: {
            '2xx': PatchSuccessResponseSchema,
            '5xx': ErrorResponseSchema,
          },
        },
      },
      update
    )

    fastify.delete(
      '/',
      {
        schema: {
          querystring: DeleteQuerystringSchema,
          response: {
            '2xx': DeleteSuccessResponseSchema,
            '5xx': ErrorResponseSchema,
          },
        },
      },
      deleteById
    )
  })
}

export default CategoriesRoute
