import { FastifyInstance } from 'fastify'
import db from '../../config/Database'
import multer from 'fastify-multer'
import CompetencesController from '../../controllers/CompetencesController'
import GetQueryStringSchema from '../../schemas/get_querystring.json'
import CompetencePostBodySchema from '../../schemas/competences/competence_post_body.json'
import CompetencePatchBodySchema from '../../schemas/competences/competence_patch_body.json'
import ParamsSchema from '../../schemas/params.json'
import DeleteQuerystringSchema from '../../schemas/delete_querystring.json'
import CompetenceGetSuccessResponseSchema from '../../schemas/competences/competence_get_success_response.json'
import CompetencePostSuccessResponseSchema from '../../schemas/competences/competence_post_success_response.json'
import ErrorResponseSchema from '../../schemas/error_response.json'
import PatchSuccessResponseSchema from '../../schemas/patch_success_response.json'
import CompetenceSchema from '../../schemas/competences/competence.json'
import CompetenceGetSingleSuccessResponse from '../../schemas/competences/competence_get_single_success_response.json'
import DeleteSuccessResponseSchema from '../../schemas/delete_success_response.json'

const upload = multer()

const competencesRoute = async (fastify: FastifyInstance) => {
  const {
    findAll,
    findById,
    create,
    update,
    deleteById,
  } = CompetencesController(db, fastify)

  fastify.addSchema(CompetenceSchema)

  fastify.get(
    '/',
    {
      schema: {
        querystring: GetQueryStringSchema,
        response: {
          '2xx': CompetenceGetSuccessResponseSchema,
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
          '2xx': CompetenceGetSingleSuccessResponse,
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
        preValidation: upload.single('image'),
        schema: {
          body: CompetencePostBodySchema,
          response: {
            '2xx': CompetencePostSuccessResponseSchema,
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
          body: CompetencePatchBodySchema,
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

export default competencesRoute
