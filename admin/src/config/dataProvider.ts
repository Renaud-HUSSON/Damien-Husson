import { DataProvider } from 'ra-core'
import { paramsToFormData } from '../util/paramsToFormdata'

const API_URL = '/api/'

export const dataProvider: DataProvider = {
  getList: async (resource, params) => {
    const data = await fetch(
      `${API_URL}${resource}?offset=${
        (params.pagination.page - 1) * params.pagination.perPage
      }&limit=${params.pagination.perPage}&order[0][]=${
        params.sort.field
      }&order[0][]=${params.sort.order}`
    ).then((res) => res.json())

    return {
      data: data.data,
      total: data.total,
    }
  },
  getOne: async (resource, params) => {
    const data = await fetch(`${API_URL}${resource}/${params.id}`).then((res) =>
      res.json()
    )

    return {
      data: data.data,
    }
  },
  getMany: async (resource, params) => {
    const ids = params.ids.toString()

    const data = await fetch(`${resource}${resource}/id[]=${ids}`).then((res) =>
      res.json()
    )

    return {
      data: data.data,
    }
  },
  //Useless in my case, there will be no references
  getManyReference: async (_resource, _params) => {
    return new Promise(() => {})
  },
  create: async (resource, params) => {
    const formData = paramsToFormData(params)

    const data = await fetch(`${API_URL}${resource}`, {
      method: 'POST',
      body: formData,
    }).then((res) => res.json())

    return {
      data: data.data,
    }
  },
  update: async (resource, params) => {
    const formData = paramsToFormData(params)

    const data = await fetch(`${API_URL}${resource}/${params.id}`, {
      method: 'PATCH',
      body: formData,
    }).then((res) => res.json())

    return {
      data: data.data,
    }
  },
  updateMany: async (_resource, _params) => {
    return new Promise(() => {})
  },
  delete: async (resource, params) => {
    const data = await fetch(`${API_URL}${resource}?id[]=${params.id}`, {
      method: 'DELETE',
    }).then((res) => res.json())

    return {
      data: data,
    }
  },
  deleteMany: async (resource, params) => {
    let url = ''

    for (let id of params.ids) {
      url += `id[]=${id}&`
    }

    await fetch(`${API_URL}${resource}?${url}`, {
      method: 'DELETE',
    }).then((res) => res.json())

    return {
      data: params.ids,
    }
  },
}
