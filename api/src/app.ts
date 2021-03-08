import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import { FastifyInstance } from 'fastify'
import db from './config/Database'
import { initFolder } from './utils/initFolder'
import fastifyStatic from 'fastify-static'
import path from 'path'
import { config } from 'dotenv'
config()

const imagesFolderPaths: string[] = [
  `${process.env.FASTIFY_PUBLIC_IMAGE_PATH}images/realisations/`,
  `${process.env.FASTIFY_PUBLIC_IMAGE_PATH}images/competences/`,
]

export type AppOptions = {} & Partial<AutoloadPluginOptions>

const app = async (fastify: FastifyInstance): Promise<void> => {
  db.sequelize.sync()
  initFolder(imagesFolderPaths)

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'images'),
    prefix: '/images/',
    decorateReply: false,
  })

  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'schemas'),
    prefix: '/schemas/',
    decorateReply: false,
  })

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
  })

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
  })
}

export default app
export { app }
