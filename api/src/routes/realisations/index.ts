import { FastifyInstance } from 'fastify'
import db from '../../config/Database'
import multer from 'fastify-multer'
import RealisationsController from '../../controllers/Controller'
import GetQueryStringSchema from '../../schemas/get_querystring.json'
import PostBodySchema from '../../schemas/post_body.json'
import PatchBodySchema from '../../schemas/patch_body.json'
import ParamsSchema from '../../schemas/params.json'
import DeleteQuerystringSchema from '../../schemas/delete_querystring.json'
import GetSuccessResponseSchema from '../../schemas/get_success_response.json'
import PostSuccessResponseSchema from '../../schemas/post_success_response.json'
import GetErrorResponseSchema from '../../schemas/error_response.json'
import PatchSuccessResponseSchema from '../../schemas/patch_success_response.json'
import RealisationSchema from '../../schemas/realisation.json'
import GetSingleSuccessResponse from '../../schemas/get_single_success_response.json'
import { GetQueryStringSchemaInterface } from '../../@types/get_querystring'
import { PostBodySchemaInterface } from '../../@types/post_body'
import { PatchBodySchemaInterface } from '../../@types/patch_body'
import { ParamsSchemaInterface } from '../../@types/params'
import { DeleteQueryStringSchemaInterface } from '../../@types/delete_querystring'
import { GetSuccessResponseSchemaInterface } from '../../@types/get_success_response'
import { PostSuccessResponseSchemaInterface } from '../../@types/post_success_response'
import { GetErrorResponseSchemaInterface } from '../../@types/error_response'
import { PatchSuccessReponseSchemaInterface } from '../../@types/patch_success_response'
import { GetSingleSuccessResponseSchemaInterface } from '../../@types/get_single_success_response'

const upload = multer()

const realisationsRoute = async (fastify: FastifyInstance) => {
  const {
    findAll,
    findById,
    create,
    update,
    deleteById,
  } = RealisationsController(db, fastify, 'realisations')

  fastify.addSchema(RealisationSchema)

  fastify.get<{
    Querystring: GetQueryStringSchemaInterface
    Response: {
      '2xx': GetSuccessResponseSchemaInterface
      '5xx': GetErrorResponseSchemaInterface
    }
  }>(
    '/',
    {
      schema: {
        querystring: GetQueryStringSchema,
        response: {
          '2xx': GetSuccessResponseSchema,
          '5xx': GetErrorResponseSchema,
        },
      },
    },
    findAll
  )

  fastify.get<{
    Params: ParamsSchemaInterface
    Response: {
      '2xx': GetSingleSuccessResponseSchemaInterface
      '4xx': GetErrorResponseSchemaInterface
      '5xx': GetErrorResponseSchemaInterface
    }
  }>(
    '/:id',
    {
      schema: {
        response: {
          '2xx': GetSingleSuccessResponse,
          '4xx': GetErrorResponseSchema,
          '5xx': GetErrorResponseSchema,
        },
      },
    },
    findById
  )

  fastify.post<{
    Body: PostBodySchemaInterface
    Response: {
      '2xx': PostSuccessResponseSchemaInterface
      '4xx': GetErrorResponseSchemaInterface
      '5xx': GetErrorResponseSchemaInterface
    }
  }>(
    '/',
    {
      preValidation: upload.single('image'),
      schema: {
        body: PostBodySchema,
        response: {
          '2xx': PostSuccessResponseSchema,
          '4xx': GetErrorResponseSchema,
          '5xx': GetErrorResponseSchema,
        },
      },
    },
    create
  )

  fastify.patch<{
    Body: PatchBodySchemaInterface
    Params: ParamsSchemaInterface
    Response: PatchSuccessReponseSchemaInterface
  }>(
    '/:id',
    {
      preValidation: upload.single('image'),
      schema: {
        body: PatchBodySchema,
        params: ParamsSchema,
        response: {
          '2xx': PatchSuccessResponseSchema,
          '4xx': GetErrorResponseSchema,
          '5xx': GetErrorResponseSchema,
        },
      },
    },
    update
  )

  fastify.delete<{
    Querystring: DeleteQueryStringSchemaInterface
  }>(
    '/',
    {
      schema: {
        querystring: DeleteQuerystringSchema,
        response: {
          '2xx': GetSuccessResponseSchema,
          '4xx': GetErrorResponseSchema,
          '5xx': GetErrorResponseSchema,
        },
      },
    },
    deleteById
  )
}

export default realisationsRoute
