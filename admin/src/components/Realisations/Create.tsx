import { required } from 'ra-core'
import {
  Create,
  CreateProps,
  ImageField,
  ImageInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'ra-ui-materialui'

export const RealisationsCreate = (props: CreateProps) => {
  return (
    <Create {...props}>
      <SimpleForm>
        <TextInput source='titre' validate={[required()]} />
        <ReferenceInput
          label='Catégorie'
          perPage={10000}
          source='categorieId'
          reference='categories'
          allowEmpty
        >
          <SelectInput
            source='id'
            optionText='nom'
            emptyText='Aucune catégorie'
          />
        </ReferenceInput>
        <ImageInput
          label='Image'
          source='image'
          validate={[required()]}
          accept='image/*'
        >
          <ImageField source='src' title='title' />
        </ImageInput>
        <TextInput
          source='description'
          multiline={true}
          fullWidth={true}
          rows={5}
          validate={[required()]}
        />
      </SimpleForm>
    </Create>
  )
}
