import { FastifyInstance, FastifyRequest } from 'fastify'
import { sendMail } from '../../utils/mail'
import ContactPostBody from '../../schemas/contact/contact_post_body.json'
import { ContactPostBodySchemaInterface } from '../../@types/contact/contact_post_body'
import ContactPostSuccessResponse from '../../schemas/delete_success_response.json'
import ContactPostErrorResponse from '../../schemas/error_response.json'

const contactRoute = async (fastify: FastifyInstance) => {
  const { internalServerError } = fastify.httpErrors

  fastify.post(
    '/',
    {
      schema: {
        body: ContactPostBody,
        response: {
          '2xx': ContactPostSuccessResponse,
          '4xx': ContactPostErrorResponse,
          '5xx': ContactPostErrorResponse,
        },
      },
    },
    async (
      req: FastifyRequest<{
        Body: ContactPostBodySchemaInterface
      }>
    ) => {
      try {
        sendMail(req.body, 'Nouveau message bonhomme !')

        return {
          success: true,
          message: 'Le message a bien été envoyé !',
        }
      } catch (e) {
        throw internalServerError()
      }
    }
  )
}

export default contactRoute
