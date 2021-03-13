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
import { CompetencePostBodySchemaInterface } from '../@types/competences/competence_post_body'
import { CompetencePatchBodySchemaInterface } from '../@types/competences/competence_patch_body'
import { ParamsSchemaInterface } from '../@types/params'
import { CompetenceGetSuccessResponseSchemaInterface } from '../@types/competences/competence_get_success_response'

export default (db: Database, fastify: FastifyInstance) => {
  const FOLDER = `${process.env.FASTIFY_PUBLIC_IMAGE_PATH}images/competences/`

  const { internalServerError, badRequest, notFound } = fastify.httpErrors

  const findAll = async (
    req: FastifyRequest<{
      Querystring: GetQueryStringSchemaInterface
      Response: CompetenceGetSuccessResponseSchemaInterface
    }>
  ) => {
    const { query } = req

    try {
      const realisations = await db.competences.findAndCountAll({
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
      const realisation = await db.competences.findByPk(id)

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
      { Body: CompetencePostBodySchemaInterface },
      Server,
      IncomingMessage
    >
  ) => {
    const file = req.file

    if (!file || !file.buffer) {
      throw badRequest('Vous devez préciser une image')
    }

    const imagePath = `/images/competences/${req.file.originalname}`

    //Stores the image or returns an error
    try {
      await promisifiedWriteFile(
        `${FOLDER}${req.file.originalname}`,
        req.file?.buffer!
      )
      const { dataValues: data } = await db.competences.create({
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
      Body: CompetencePatchBodySchemaInterface
      Params: ParamsSchemaInterface
    }>
  ) => {
    const { file } = req
    const { id } = req.params

    const imagePath = `/images/competences/${req.file.originalname}`

    const values = {
      ...req.body,
      ...(file && { image: imagePath }),
    }

    try {
      if (file) {
        const realisation = await db.competences.findByPk(id)

        if (realisation) {
          await deleteOldFileAndCreateAnother(
            realisation.dataValues.image,
            `${FOLDER}${req.file.originalname}`,
            file.buffer!
          )
        }
      }

      const data = await db.competences.update(values, {
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
      const realisations = await db.competences.findAll({
        where: { id: req.query.id },
      })

      for (let realisation of realisations) {
        const imagePath = `${process.env.FASTIFY_PUBLIC_IMAGE_PATH}${realisation.dataValues.image}`

        await promisifiedDeleteFile(imagePath).catch((_e) => {})
      }

      await db.competences.destroy({
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

  return { findAll, findById, create, update, deleteById }
}
