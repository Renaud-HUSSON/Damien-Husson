import { required } from 'ra-core'
import {
  DateInput,
  Edit,
  EditProps,
  ImageField,
  ImageInput,
  NumberInput,
  SimpleForm,
  TextInput,
} from 'ra-ui-materialui'

export const RealisationsEdit = (props: EditProps) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput source='id' disabled={true} />
        <TextInput source='titre' validate={[required()]} />
        <ImageField label='Ancienne mage' source='image' title='title' />
        <ImageInput
          label='Image'
          source='image'
          validate={[required()]}
          accept='image/*'
        >
          <ImageField title='titre' />
        </ImageInput>
        <TextInput source='description' validate={[required()]} />
        <DateInput source='createdAt' disabled={true} />
        <DateInput source='updatedAt' disabled={true} />
      </SimpleForm>
    </Edit>
  )
}
