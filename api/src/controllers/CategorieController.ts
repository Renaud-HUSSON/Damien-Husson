import { Database } from '../ts/interfaces/db'
import { FastifyInstance, FastifyRequest } from 'fastify'
import { ParamsSchemaInterface } from '../@types/params'
import { GetQueryStringSchemaInterface } from '../@types/get_querystring'
import { CategoriePostPatchBodySchemaInterface } from '../@types/categories/categorie_post_patch_body'
import { DeleteQueryStringSchemaInterface } from '../@types/delete_querystring'

export default (db: Database, fastify: FastifyInstance) => {
  const { internalServerError, notFound } = fastify.httpErrors

  const findAll = async (
    req: FastifyRequest<{
      Querystring: GetQueryStringSchemaInterface
    }>
  ) => {
    const { query } = req

    try {
      const categories = await db.categories.findAndCountAll(query)

      return {
        success: true,
        data: categories.rows,
        total: categories.count,
      }
    } catch (err) {
      throw internalServerError()
    }
  }

  const findById = async (
    req: FastifyRequest<{
      Params: ParamsSchemaInterface
    }>
  ) => {
    const { id } = req.params

    let categorie

    try {
      categorie = await db.categories.findByPk(id)
    } catch (e) {
      throw internalServerError()
    }

    if (!categorie) {
      throw notFound()
    }

    return {
      success: true,
      data: categorie,
    }
  }

  const create = async (
    req: FastifyRequest<{
      Body: CategoriePostPatchBodySchemaInterface
    }>
  ) => {
    try {
      const { dataValues: data } = await db.categories.create(req.body)

      return {
        success: true,
        message: 'La catégorie a bien été ajoutée',
        data,
      }
    } catch (err) {
      throw internalServerError()
    }
  }

  const update = async (
    req: FastifyRequest<{
      Body: CategoriePostPatchBodySchemaInterface
      Params: ParamsSchemaInterface
    }>
  ) => {
    try {
      const data = await db.categories.update(req.body, {
        where: {
          id: req.params.id,
        },
      })

      return {
        success: true,
        message: 'Les informations ont bien été mises à jour',
        data: {
          id: data[0],
        },
      }
    } catch (err) {
      throw internalServerError()
    }
  }

  const deleteById = async (
    req: FastifyRequest<{
      Querystring: DeleteQueryStringSchemaInterface
    }>
  ) => {
    try {
      await db.categories.destroy({
        where: {
          id: req.query.id,
        },
      })

      return {
        success: true,
        message: 'Les catégories ont bien été supprimées',
      }
    } catch (err) {
      throw internalServerError()
    }
  }

  return {
    findAll,
    findById,
    create,
    update,
    deleteById,
  }
}
