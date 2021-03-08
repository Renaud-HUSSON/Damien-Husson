import { Admin, Resource } from 'react-admin'
import { RealisationsCreate } from './components/Realisations/Create'
import { RealisationsEdit } from './components/Realisations/Edit'
import { RealisationsList } from './components/Realisations/List'
import { dataProvider } from './config/dataProvider'
import RealisationsIcon from '@material-ui/icons/Work'

const App = () => {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name='realisations'
        list={RealisationsList}
        create={RealisationsCreate}
        edit={RealisationsEdit}
        icon={RealisationsIcon}
      />
    </Admin>
  )
}

export default App
