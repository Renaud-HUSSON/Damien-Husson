import { required } from 'ra-core'
import {
  DateInput,
  Edit,
  EditProps,
  NumberInput,
  SimpleForm,
  TextInput,
} from 'ra-ui-materialui'

export const CategoriesEdit = (props: EditProps) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <NumberInput source='id' disabled={true} />
        <TextInput source='nom' validate={[required()]} />
        <DateInput source='createdAt' disabled={true} />
        <DateInput source='updatedAt' disabled={true} />
      </SimpleForm>
    </Edit>
  )
}
