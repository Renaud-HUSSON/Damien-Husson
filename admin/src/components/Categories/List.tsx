import {
  Datagrid,
  List,
  ListProps,
  SimpleList,
  TextField,
} from 'ra-ui-materialui'
import { useMediaQuery } from '@material-ui/core'

export const CategoriesList = (props: ListProps) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  return (
    <List {...props}>
      {isSmall ? (
        <SimpleList
          primaryText={(record) => record.nom}
          tertiaryText={(record) =>
            new Date(record.createdAt).toLocaleDateString()
          }
        ></SimpleList>
      ) : (
        <Datagrid rowClick='edit'>
          <TextField source='id' />
          <TextField source='nom' />
        </Datagrid>
      )}
    </List>
  )
}
