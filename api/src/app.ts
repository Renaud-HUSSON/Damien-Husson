import { join } from 'path'
import AutoLoad, { AutoloadPluginOptions } from 'fastify-autoload'
import { FastifyPluginAsync } from 'fastify'
import db from './config/Database'
import { initFolder } from './utils/initFolder'
import fastifyStatic from 'fastify-static'
import * as path from 'path'

db.sequelize.sync()

const imagesFolderPaths: string[] = [
  `${process.env.FASTIFY_PUBLIC_IMAGE_PATH}/realisations/`,
  `${process.env.FASTIFY_PUBLIC_IMAGE_PATH}/competences/`,
]
initFolder(imagesFolderPaths)

export type AppOptions = {} & Partial<AutoloadPluginOptions>

const app: FastifyPluginAsync<AppOptions> = async (
  fastify,
  opts
): Promise<void> => {
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'images'),
    prefix: '/images/',
  })

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'plugins'),
    options: opts,
  })

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    options: opts,
  })
}

export default app
export { app }
