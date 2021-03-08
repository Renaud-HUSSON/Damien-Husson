import { Admin, Resource } from 'react-admin'
import { RealisationsCreate } from './components/Realisations/Create'
import { RealisationsEdit } from './components/Realisations/Edit'
import { RealisationsList } from './components/Realisations/List'
import { dataProvider } from './config/dataProvider'
import RealisationsIcon from '@material-ui/icons/WorkOutline'
import { CompetencesList } from './components/Competences/List'
import { CompetencesCreate } from './components/Competences/Create'
import { CompetencesEdit } from './components/Competences/Edit'
import CompetencesIcon from '@material-ui/icons/BookmarkBorder'

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
      <Resource
        name='competences'
        list={CompetencesList}
        create={CompetencesCreate}
        edit={CompetencesEdit}
        icon={CompetencesIcon}
      />
    </Admin>
  )
}

export default App
