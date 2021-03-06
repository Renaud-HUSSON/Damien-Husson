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
import { PostBodySchemaInterface } from '../@types/post_body'
import { PatchBodySchemaInterface } from '../@types/patch_body'
import { ParamsSchemaInterface } from '../@types/params'
import { GetSuccessResponseSchemaInterface } from '../@types/get_success_response'

const REALISATIONS_FOLDER = `${process.env.FASTIFY_PUBLIC_IMAGE_PATH}realisations/`

export default (db: Database, fastify: FastifyInstance, table: string) => {
  const { internalServerError, badRequest, notFound } = fastify.httpErrors

  const findAll = async (
    req: FastifyRequest<{
      Querystring: GetQueryStringSchemaInterface
      Response: GetSuccessResponseSchemaInterface
    }>
  ) => {
    const { query } = req

    try {
      const realisations = await db[table].findAndCountAll({
        ...query,
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
    req: FastifyRequest<
      { Params: ParamsSchemaInterface },
      Server,
      IncomingMessage
    >
  ) => {
    const { id } = req.params

    try {
      const realisation = await db[table].findByPk(id)

      if (!realisation) {
        throw notFound('La ressource est introuvable')
      }

      return {
        success: true,
        data: realisation,
      }
    } catch (err) {
      throw internalServerError(`Une erreur est survenue: ${err}`)
    }
  }

  const create = async (
    req: FastifyRequest<
      { Body: PostBodySchemaInterface },
      Server,
      IncomingMessage
    >
  ) => {
    const file = req.file

    if (!file || !file.buffer) {
      throw badRequest('Vous devez préciser une image')
    }

    //Stores the image or returns an error
    try {
      await promisifiedWriteFile(
        `${REALISATIONS_FOLDER}${req.file.originalname}`,
        req.file?.buffer!
      )
      const { dataValues: data } = await db[table].create({
        ...req.body,
        image: req.file.originalname,
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
      Body: PatchBodySchemaInterface
      Params: ParamsSchemaInterface
    }>
  ) => {
    const { file } = req
    const { id } = req.params

    if (!req.body?.titre && !file) {
      throw badRequest('Vous devez préciser un titre et / ou une image')
    }

    const values = {
      ...req.body,
      ...(file && { image: file.originalname }),
    }

    try {
      if (file) {
        const realisation = await db[table].findByPk(id)

        if (realisation) {
          await deleteOldFileAndCreateAnother(
            REALISATIONS_FOLDER + realisation.dataValues.image,
            REALISATIONS_FOLDER + file.originalname,
            file.buffer!
          )
        }
      }

      const data = await db[table].update(values, {
        where: { id },
      })

      return {
        success: true,
        message: 'Les informations ont bien été mises à jour',
        data: data,
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
    console.log(req.query)

    try {
      const realisations = await db[table].findAll({
        where: { id: req.query },
      })

      for (let realisation of realisations) {
        await promisifiedDeleteFile(
          REALISATIONS_FOLDER + realisation.dataValues.image
        )
      }

      await db[table].destroy({
        where: { id: req.query },
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

  return { findAll, findById, create, update, deleteById }
}
