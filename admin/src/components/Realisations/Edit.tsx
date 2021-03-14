import { required } from 'ra-core'
import {
  DateInput,
  Edit,
  EditProps,
  ImageField,
  ImageInput,
  NumberInput,
  ReferenceInput,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'ra-ui-materialui'

export const RealisationsEdit = (props: EditProps) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput source='id' disabled={true} />
        <NumberInput source='likes' disabled={true} />
        <TextInput source='titre' validate={[required()]} />
        <ReferenceInput
          label='Catégorie'
          perPage={10000}
          source='categorieId'
          reference='categories'
        >
          <SelectInput source='id' optionText='nom' />
        </ReferenceInput>
        <ImageField label='Ancienne mage' source='image' title='title' />
        <ImageInput
          label='Image'
          source='image'
          validate={[required()]}
          accept='image/*'
        >
          <ImageField title='titre' />
        </ImageInput>
        <TextInput
          source='description'
          multiline={true}
          fullWidth={true}
          rows={5}
          validate={[required()]}
        />
        <DateInput source='createdAt' disabled={true} />
        <DateInput source='updatedAt' disabled={true} />
      </SimpleForm>
    </Edit>
  )
}
