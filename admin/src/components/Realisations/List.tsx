import {
  Datagrid,
  List,
  ListProps,
  SimpleList,
  TextField,
} from 'ra-ui-materialui'
import { useMediaQuery } from '@material-ui/core'

export const RealisationsList = (props: ListProps) => {
  const isSmall = useMediaQuery((theme: any) => theme.breakpoints.down('sm'))

  return (
    <List {...props}>
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
          <TextField source='image' />
          <TextField source='description' />
        </Datagrid>
      )}
    </List>
  )
}
