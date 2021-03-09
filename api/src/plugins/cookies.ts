import fp from 'fastify-plugin'
import cookie from 'fastify-cookie'

export default fp((fastify, _opts) => {
  return fastify.register(cookie, {
    secret: process.env.FASTIFY_PUBLIC_COOKIES_SECRET,
  })
})
