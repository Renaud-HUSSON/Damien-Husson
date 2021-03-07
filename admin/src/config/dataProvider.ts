import {
  CreateParams,
  CreateResult,
  DataProvider,
  DeleteManyParams,
  DeleteManyResult,
  DeleteParams,
  DeleteResult,
  GetListParams,
  GetListResult,
  GetManyParams,
  GetManyReferenceParams,
  GetManyReferenceResult,
  GetManyResult,
  GetOneParams,
  GetOneResult,
  UpdateManyParams,
  UpdateManyResult,
  UpdateParams,
  UpdateResult,
} from 'ra-core'

const API_URL = '/api/'

export const dataProvider: DataProvider = {
  getList: async <GetListType>(
    resource: string,
    params: GetListParams
  ): Promise<GetListResult<GetListType>> => {
    console.log(params)

    const data: GetListResult<GetListType> = await fetch(
      `${API_URL}${resource}?page=${params.pagination.page}&offset=${
        params.pagination.perPage * params.pagination.page - 1
      }`
    ).then((res) => res.json())

    return {
      data: data.data,
      total: data.total,
    }
  },
  getOne: async <GetOneType>(
    resource: string,
    params: GetOneParams
  ): Promise<GetOneResult<GetOneType>> => {
    const data: GetOneResult<GetOneType> = await fetch(
      `${API_URL}${resource}/${params.id}`
    ).then((res) => res.json())

    return {
      data: data.data,
    }
  },
  getMany: async <GetManyType>(
    resource: string,
    params: GetManyParams
  ): Promise<GetManyResult<GetManyType>> => {
    const ids = params.ids.toString()

    const data: GetManyResult<GetManyType> = await fetch(
      `${resource}${resource}/id[]=${ids}`
    ).then((res) => res.json())

    return {
      data: data.data,
    }
  },
  //Useless in my case, there will be no references
  getManyReference: async <GetManyReferenceType>(
    resource: string,
    params: GetManyReferenceParams
  ): Promise<GetManyReferenceResult<GetManyReferenceType>> => {
    return new Promise<GetManyReferenceResult<GetManyReferenceType>>(() => {})
  },
  create: async <CreateType>(
    resource: string,
    params: CreateParams
  ): Promise<CreateResult<CreateType>> => {
    const formData = new FormData()

    for (let item in params.data) {
      formData.append(item, params.data[item])
    }

    const data: CreateType = await fetch(`${API_URL}${resource}`, {
      method: 'POST',
      body: formData,
      headers: new Headers({ 'Content-Type': 'multipart/formdata' }),
    }).then((res) => res.json())

    return {
      data: data,
    }
  },
  update: async <UpdateType>(
    resource: string,
    params: UpdateParams
  ): Promise<UpdateResult<UpdateType>> => {
    const formData = new FormData()

    for (let item in params.data) {
      formData.append(item, params.data[item])
    }

    const data: UpdateType = await fetch(`${API_URL}${resource}/${params.id}`, {
      method: 'PATCH',
      body: formData,
      headers: new Headers({ 'Content-Type': 'multipart/formdata' }),
    }).then((res) => res.json())

    return {
      data: data,
    }
  },
  updateMany: async (
    _resource: string,
    _params: UpdateManyParams
  ): Promise<UpdateManyResult> => {
    return new Promise<UpdateManyResult>(() => {})
  },
  delete: async <DeleteType>(
    resource: string,
    params: DeleteParams
  ): Promise<DeleteResult<DeleteType>> => {
    const data: DeleteType = await fetch(
      `${API_URL}${resource}?id=${params.id}`
    ).then((res) => res.json())

    return {
      data: data,
    }
  },
  deleteMany: async (
    resource: string,
    params: DeleteManyParams
  ): Promise<DeleteManyResult> => {
    const data = await fetch(
      `${API_URL}${resource}?id=${params.ids}`
    ).then((res) => res.json())

    return {
      data: data,
    }
  },
}
