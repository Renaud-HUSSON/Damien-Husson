import { FastifyInstance } from 'fastify'
import db from '../../config/Database'
import multer from 'fastify-multer'
import RealisationsController from '../../controllers/RealisationsController'
import GetQueryStringSchema from '../../schemas/get_querystring.json'
import RealisationPostBodySchema from '../../schemas/realisations/realisation_post_body.json'
import RealisationPatchBodySchema from '../../schemas/realisations/realisation_patch_body.json'
import ParamsSchema from '../../schemas/params.json'
import DeleteQuerystringSchema from '../../schemas/delete_querystring.json'
import RealisationGetSuccessResponseSchema from '../../schemas/realisations/realisation_get_success_response.json'
import RealisationPostSuccessResponseSchema from '../../schemas/realisations/realisation_post_success_response.json'
import ErrorResponseSchema from '../../schemas/error_response.json'
import PatchSuccessResponseSchema from '../../schemas/patch_success_response.json'
import RealisationSchema from '../../schemas/realisations/realisation.json'
import RealisationGetSingleSuccessResponse from '../../schemas/realisations/realisation_get_single_success_response.json'
import DeleteSuccessResponseSchema from '../../schemas/delete_success_response.json'
import RealisationPostLikeBody from '../../schemas/realisations/realisation_post_like_body.json'
import RealisationPostUnlikeBody from '../../schemas/realisations/realisation_post_unlike_body.json'
import RealisationPostLikeUnlikeSuccessResponse from '../../schemas/realisations/realisation_get_like_unlike_success_response.json'

const upload = multer()

const realisationsRoute = async (fastify: FastifyInstance) => {
  const {
    findAll,
    findById,
    create,
    update,
    deleteById,
    like,
    unlike,
  } = RealisationsController(db, fastify)

  fastify.addSchema(RealisationSchema)

  fastify.get(
    '/',
    {
      schema: {
        querystring: GetQueryStringSchema,
        response: {
          '2xx': RealisationGetSuccessResponseSchema,
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
          '2xx': RealisationGetSingleSuccessResponse,
          '4xx': ErrorResponseSchema,
          '5xx': ErrorResponseSchema,
        },
      },
    },
    findById
  )

  fastify.post(
    '/like',
    {
      schema: {
        body: RealisationPostLikeBody,
        response: {
          '2xx': RealisationPostLikeUnlikeSuccessResponse,
          '5xx': ErrorResponseSchema,
        },
      },
    },
    like
  )

  fastify.post(
    '/unlike',
    {
      schema: {
        body: RealisationPostUnlikeBody,
        response: {
          '2xx': RealisationPostLikeUnlikeSuccessResponse,
          '5xx': ErrorResponseSchema,
        },
      },
    },
    unlike
  )

  fastify.register(async (fastify) => {
    fastify.addHook('onRequest', fastify.auth)

    fastify.post(
      '/',
      {
        preValidation: upload.single('image'),
        schema: {
          body: RealisationPostBodySchema,
          response: {
            '2xx': RealisationPostSuccessResponseSchema,
            '5xx': ErrorResponseSchema,
          },
        },
      },
      create
    )

    fastify.patch(
      '/:id',
      {
        preValidation: upload.single('image'),
        schema: {
          body: RealisationPatchBodySchema,
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

export default realisationsRoute
