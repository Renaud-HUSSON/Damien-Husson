import { FastifyInstance } from 'fastify'
import db from '../../config/Database'
import multer from 'fastify-multer'
import RealisationsController from '../../controllers/CompetencesController'
import GetQueryStringSchema from '../../schemas/get_querystring.json'
import PostBodySchema from '../../schemas/post_body.json'
import PatchBodySchema from '../../schemas/patch_body.json'
import ParamsSchema from '../../schemas/params.json'
import DeleteQuerystringSchema from '../../schemas/delete_querystring.json'
import GetSuccessResponseSchema from '../../schemas/get_success_response.json'
import PostSuccessResponseSchema from '../../schemas/post_success_response.json'
import ErrorResponseSchema from '../../schemas/error_response.json'
import PatchSuccessResponseSchema from '../../schemas/patch_success_response.json'
import RealisationAndSkillSchema from '../../schemas/realisationAndSkill.json'
import GetSingleSuccessResponse from '../../schemas/get_single_success_response.json'
import DeleteSuccessResponseSchema from '../../schemas/delete_success_response.json'

const upload = multer()

const realisationsRoute = async (fastify: FastifyInstance) => {
  const {
    findAll,
    findById,
    create,
    update,
    deleteById,
  } = RealisationsController(db, fastify)

  fastify.addSchema(RealisationAndSkillSchema)

  fastify.get(
    '/',
    {
      schema: {
        querystring: GetQueryStringSchema,
        response: {
          '2xx': GetSuccessResponseSchema,
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
          '2xx': GetSingleSuccessResponse,
          '4xx': ErrorResponseSchema,
          '5xx': ErrorResponseSchema,
        },
      },
    },
    findById
  )

  fastify.register(async (fastify) => {
    fastify.addHook('onRequest', fastify.auth)

    fastify.post(
      '/',
      {
        preValidation: upload.single('image'),
        schema: {
          body: PostBodySchema,
          response: {
            '2xx': PostSuccessResponseSchema,
            '4xx': ErrorResponseSchema,
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
          body: PatchBodySchema,
          params: ParamsSchema,
          response: {
            '2xx': PatchSuccessResponseSchema,
            '4xx': ErrorResponseSchema,
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
            '4xx': ErrorResponseSchema,
            '5xx': ErrorResponseSchema,
          },
        },
      },
      deleteById
    )
  })
}

export default realisationsRoute
