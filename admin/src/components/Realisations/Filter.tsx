import { Filter, ReferenceInput, SelectInput } from 'react-admin'

export const RealisationsFilter = (props: any) => {
  return (
    <Filter {...props}>
      <ReferenceInput
        perPage={100000}
        label='Catégorie'
        source='categorieId'
        reference='categories'
        allowEmpty={false}
      >
        <SelectInput source='categorie' optionText='nom' />
      </ReferenceInput>
    </Filter>
  )
}
