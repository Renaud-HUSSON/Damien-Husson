import jwt from 'jsonwebtoken'
import db from '../config/Database'
import { FastifyReply, FastifyRequest } from 'fastify'

const REFRESH_TOKEN_SECRET = process.env.FASTIFY_PUBLIC_REFRESH_TOKEN_SECRET
const ACCESS_TOKEN_SECRET = process.env.FASTIFY_PUBLIC_ACCESS_TOKEN_SECRET

export const deleteTokenCookies = (reply: FastifyReply) => {
  reply.setCookie('refreshToken', '', {
    maxAge: 0,
    path: '/',
  })
  reply.setCookie('accessToken', '', {
    maxAge: 0,
    path: '/',
  })
}

export const createRefreshToken = async (userId: number) => {
  const refreshToken = jwt.sign(
    {
      userId: userId,
    },
    REFRESH_TOKEN_SECRET
  )

  await db.refreshTokens.create({
    utilisateurId: userId,
    token: refreshToken,
  })

  return refreshToken
}

export const createAccessToken = (duration: string = '600s') => {
  return jwt.sign({}, ACCESS_TOKEN_SECRET, { expiresIn: duration })
}

export const verifyRefreshToken = async (refreshToken: string) => {
  return jwt.verify(refreshToken, REFRESH_TOKEN_SECRET)
}

export const verifyAccessToken = async (accesToken: string) => {
  return jwt.verify(accesToken, ACCESS_TOKEN_SECRET)
}

export const verifyRefreshTokenAndCreateAccessToken = async (
  req: FastifyRequest,
  reply: FastifyReply
) => {
  const exists = await db.refreshTokens.findOne({
    where: {
      token: req.cookies.refreshToken,
    },
  })

  if (!exists) {
    throw new Error()
  }

  const accessToken = createAccessToken('15s')

  reply.setCookie('accessToken', accessToken, {
    httpOnly: true,
    path: '/',
  })
}

export const deleteRefreshTokenFromDatabase = async (token: string) => {
  await db.refreshTokens
    .destroy({
      where: {
        token: token,
      },
    })
    .catch(() => {})
}
