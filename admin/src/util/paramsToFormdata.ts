export const paramsToFormData = (data: any): FormData => {
  const formData = new FormData()

  for (let item in data) {
    formData.append(item, data[item]?.rawFile ? data[item].rawFile : data[item])
  }

  return formData
}
