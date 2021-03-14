import { FastifyRequest, FastifyInstance } from 'fastify'
import { IncomingMessage, Server } from 'http'
import { Database } from '../ts/interfaces/db'
import {
  deleteOldFileAndCreateAnother,
  promisifiedDeleteFile,
  promisifiedWriteFile,
} from '../utils/file'
import { GetQueryStringSchemaInterface } from '../@types/get_querystring'
import { DeleteQueryStringSchemaInterface } from '../@types/delete_querystring'
import { RealisationPostBodySchemaInterface } from '../@types/realisations/realisation_post_body'
import { RealisationPatchBodySchemaInterface } from '../@types/realisations/realisation_patch_body'
import { ParamsSchemaInterface } from '../@types/params'
import { RealisationGetSuccessResponseSchemaInterface } from '../@types/realisations/realisation_get_success_response'
import { RealisationPostLikeBodySchemaInterface } from '../@types/realisations/realisation_post_like_body'

export default (db: Database, fastify: FastifyInstance) => {
  const FOLDER = `${process.env.FASTIFY_PUBLIC_IMAGE_PATH}images/realisations/`

  const { internalServerError, badRequest, notFound } = fastify.httpErrors

  const findAll = async (
    req: FastifyRequest<{
      Querystring: GetQueryStringSchemaInterface
      Response: RealisationGetSuccessResponseSchemaInterface
    }>
  ) => {
    const { query } = req

    try {
      const realisations = await db.realisations.findAndCountAll({
        ...query,
        include: db.categories,
      })

      return {
        success: true,
        data: realisations.rows,
        total: realisations.count,
      }
    } catch (err) {
      throw internalServerError(`Une erreur est survenue: ${err}`)
    }
  }

  const findById = async (
    req: FastifyRequest<{ Params: ParamsSchemaInterface }>
  ) => {
    const { id } = req.params

    let realisation

    try {
      realisation = await db.realisations.findByPk(id)
    } catch (err) {
      throw internalServerError(`Une erreur est survenue: ${err}`)
    }

    if (!realisation) {
      throw notFound('La ressource est introuvable')
    }

    return {
      success: true,
      data: realisation,
    }
  }

  const create = async (
    req: FastifyRequest<{ Body: RealisationPostBodySchemaInterface }>
  ) => {
    const file = req.file

    if (!file || !file.buffer) {
      throw badRequest('Vous devez préciser une image')
    }

    const imagePath = `/images/realisations/${req.file.originalname}`

    //Stores the image or returns an error
    try {
      await promisifiedWriteFile(
        `${FOLDER}${req.file.originalname}`,
        req.file?.buffer!
      )
      const { dataValues: data } = await db.realisations.create({
        ...req.body,
        image: imagePath,
      })
      return {
        success: true,
        message: "L'image a bien été ajoutée",
        data: data,
      }
    } catch (err) {
      throw internalServerError(
        `Une erreur est survenue lors de l'upload de l'image: ${err}`
      )
    }
  }

  const update = async (
    req: FastifyRequest<{
      Body: RealisationPatchBodySchemaInterface
      Params: ParamsSchemaInterface
    }>
  ) => {
    const { file } = req
    const { id } = req.params

    const imagePath = `/images/realisations/${req.file?.originalname}`

    const values = {
      ...req.body,
      ...(file && { image: imagePath }),
    }

    try {
      if (file) {
        const realisation = await db.realisations.findByPk(id)

        if (realisation) {
          await deleteOldFileAndCreateAnother(
            realisation.dataValues.image,
            `${FOLDER}${req.file.originalname}`,
            file.buffer!
          )
        }
      }

      const data = await db.realisations.update(values, {
        where: { id },
      })

      return {
        success: true,
        message: 'Les informations ont bien été mises à jour',
        data: {
          id: data[0],
        },
      }
    } catch (err) {
      throw internalServerError(
        `Une erreur est survenue lors de la mise à jour des informations: ${err}`
      )
    }
  }

  const deleteById = async (
    req: FastifyRequest<{ Querystring: DeleteQueryStringSchemaInterface }>
  ) => {
    try {
      const realisations = await db.realisations.findAll({
        where: { id: req.query.id },
      })

      for (let realisation of realisations) {
        const imagePath = `${process.env.FASTIFY_PUBLIC_IMAGE_PATH}${realisation.dataValues.image}`

        await promisifiedDeleteFile(imagePath).catch((_e) => {})
      }

      await db.realisations.destroy({
        where: { id: req.query.id },
      })

      return {
        success: true,
        message: 'Les réalisations ont bien été supprimées',
      }
    } catch (err) {
      throw internalServerError(
        `Une erreur est survenue lors de la suppression d'une image: ${err}`
      )
    }
  }

  const like = async (
    req: FastifyRequest<{ Body: RealisationPostLikeBodySchemaInterface }>
  ) => {
    try {
      await db.realisations.increment(
        {
          likes: 1,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )

      return {
        success: true,
      }
    } catch (err) {
      throw internalServerError()
    }
  }

  const unlike = async (
    req: FastifyRequest<{ Body: RealisationPostLikeBodySchemaInterface }>
  ) => {
    try {
      await db.realisations.increment(
        {
          likes: -1,
        },
        {
          where: {
            id: req.body.id,
          },
        }
      )

      return {
        success: true,
      }
    } catch (err) {
      throw internalServerError()
    }
  }

  return { findAll, findById, create, update, deleteById, like, unlike }
}
