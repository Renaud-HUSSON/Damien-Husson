import {
  Datagrid,
  List,
  ListProps,
  ReferenceField,
  SimpleList,
  TextField,
} from 'ra-ui-materialui'
import { useMediaQuery } from '@material-ui/core'
import { RealisationsFilter } from './Filter'

export const RealisationsList = (props: ListProps) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  return (
    <List {...props} filters={<RealisationsFilter />}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.titre}
          secondaryText={(record) => record.description}
          tertiaryText={(record) =>
            new Date(record.createdAt).toLocaleDateString()
          }
        ></SimpleList>
      ) : (
        <Datagrid rowClick='edit'>
          <TextField source='id' />
          <TextField source='titre' />
          <ReferenceField source='categorieId' reference='categories'>
            <TextField source='nom' label='Catégorie' sortable={false} />
          </ReferenceField>
          <TextField source='description' />
        </Datagrid>
      )}
    </List>
  )
}
