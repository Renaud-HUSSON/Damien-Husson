import { required } from 'ra-core'
import {
  Create,
  CreateProps,
  ImageField,
  ImageInput,
  SimpleForm,
  TextInput,
} from 'ra-ui-materialui'

export const RealisationsCreate = (props: CreateProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source='titre' validate={[required()]} />
        <ImageInput
          label='Image'
          source='image'
          validate={[required()]}
          accept='image/*'
        >
          <ImageField source='src' title='title' />
        </ImageInput>
        <TextInput source='description' validate={[required()]} />
      </SimpleForm>
    </Create>
  )
}
