// Read the .env file.
import qs from 'qs'
import app from './app'

// Require the framework
import Fastify from 'fastify'
import sensible from 'fastify-sensible'

// Instantiate Fastify with some config
const fastify = Fastify({
  logger: true,
  querystringParser: (str: string) => {
    return qs.parse(str, {
      allowDots: true,
    })
  },
})

fastify.register(sensible, {
  errorHandler: false,
})

fastify.register(app)

// Start listening.
fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  console.log(`Server listening at ${address}`)

  if (err) {
    fastify.log.error(err.message)
    process.exit(1)
  }
})
