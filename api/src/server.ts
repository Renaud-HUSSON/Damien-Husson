// Read the .env file.
import dotenv from 'dotenv'
import qs from 'qs'
import app from './app'
dotenv.config()

// Require the framework
import Fastify from 'fastify'

// Instantiate Fastify with some config
const fastify = Fastify({
  logger: true,
  querystringParser: (str: string) =>
    qs.parse(str, {
      allowDots: true,
    }),
})

// Register your application as a normal plugin.
fastify.register(app)

// Start listening.
fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err, address) => {
  console.log(`Server listening at ${address}`)

  if (err) {
    fastify.log.error(err.message)
    process.exit(1)
  }
})