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
import { authProvider } from './config/authProvider'
import { CategoriesCreate } from './components/Categories/Create'
import { CategoriesEdit } from './components/Categories/Edit'
import { CategoriesList } from './components/Categories/List'

const App = () => {
  return (
    <Admin dataProvider={dataProvider} authProvider={authProvider}>
      <Resource
        options={{ label: 'Réalisations' }}
        name='realisations'
        list={RealisationsList}
        create={RealisationsCreate}
        edit={RealisationsEdit}
        icon={RealisationsIcon}
      />
      <Resource
        options={{ label: 'Compétences' }}
        name='competences'
        list={CompetencesList}
        create={CompetencesCreate}
        edit={CompetencesEdit}
        icon={CompetencesIcon}
      />
      <Resource
        options={{ label: 'Catégories' }}
        name='categories'
        list={CategoriesList}
        create={CategoriesCreate}
        edit={CategoriesEdit}
      />
    </Admin>
  )
}

export default App
