import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { PostLoginBodySchemaInterface } from '../@types/auth/post_login_body'
import { Database } from '../ts/interfaces/db'
import bcrypt from 'bcrypt'
import {
  createAccessToken,
  createRefreshToken,
  deleteRefreshTokenFromDatabase,
  verifyAccessToken,
  verifyRefreshTokenAndCreateAccessToken,
  deleteTokenCookies,
} from '../utils/tokens'

export const UtilisateursController = (
  db: Database,
  fastify: FastifyInstance
) => {
  const { unauthorized } = fastify.httpErrors

  const login = async (
    req: FastifyRequest<{
      Body: PostLoginBodySchemaInterface
    }>,
    reply: FastifyReply
  ) => {
    const { email, password } = req.body

    const account = await db.utilisateurs.findOne({
      where: {
        email,
      },
    })

    if (!account) {
      throw unauthorized()
    }

    const matches = await bcrypt.compare(password, account.dataValues.password)

    if (!matches) {
      throw unauthorized()
    }

    const accessToken = createAccessToken('15s')
    const refreshToken = await createRefreshToken(account.dataValues.id)

    reply.setCookie('accessToken', accessToken, {
      httpOnly: true,
    })
    reply.setCookie('refreshToken', refreshToken, {
      httpOnly: true,
    })

    return {
      success: true,
      message: 'Vous êtes bien connecté',
    }
  }

  const authenticated = async (req: FastifyRequest, reply: FastifyReply) => {
    const { accessToken, refreshToken } = req.cookies

    if (!accessToken && !refreshToken) {
      throw unauthorized()
    }

    try {
      if (!accessToken) {
        await verifyRefreshTokenAndCreateAccessToken(req, reply)
      } else {
        await verifyAccessToken(accessToken).catch(async () => {
          await verifyRefreshTokenAndCreateAccessToken(req, reply)
        })
      }
    } catch (err) {
      deleteTokenCookies(reply)

      throw unauthorized()
    }

    return true
  }

  const logout = async (req: FastifyRequest, reply: FastifyReply) => {
    const { refreshToken } = req.cookies

    await deleteRefreshTokenFromDatabase(refreshToken)

    deleteTokenCookies(reply)

    return {}
  }

  return { login, authenticated, logout }
}
