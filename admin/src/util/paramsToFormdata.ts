import { CreateParams, UpdateParams } from 'ra-core'

export const paramsToFormData = (
  params: CreateParams | UpdateParams
): FormData => {
  const formData = new FormData()

  for (let item in params.data) {
    formData.append(
      item,
      params.data[item]?.hasOwnProperty('rawFile')
        ? params.data[item].rawFile
        : params.data[item]
    )
  }
  return formData
}
