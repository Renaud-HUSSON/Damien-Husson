import { required } from 'ra-core'
import { Create, CreateProps, SimpleForm, TextInput } from 'ra-ui-materialui'

export const CategoriesCreate = (props: CreateProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source='nom' validate={[required()]} />
      </SimpleForm>
    </Create>
  )
}
