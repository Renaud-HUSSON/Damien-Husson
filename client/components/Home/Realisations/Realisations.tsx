import { Dispatch, SetStateAction } from 'react'
import { Categorie, Realisation, ShowRealisation } from '../../..'
import { FilterRealisations } from '../FilterRealisations'
import { RealisationsItem } from './RealisationItem'

interface RealisationsProps {
  realisations: Realisation[]
  categories: Categorie[]
  displayedRealisations: Realisation[]
  setDisplayedRealisations: Dispatch<SetStateAction<Realisation[]>>
  setShowRealisation: Dispatch<SetStateAction<ShowRealisation>>
  setRealisations: Dispatch<SetStateAction<Realisation[]>>
}

export const Realisations = ({
  realisations,
  categories,
  displayedRealisations,
  setDisplayedRealisations,
  setShowRealisation,
  setRealisations,
}: RealisationsProps) => {
  return (
    <>
      <div id='realisations'></div>
      <section className='home__realisations'>
        <h2>Mes Réalisations</h2>
        <FilterRealisations
          categories={categories}
          realisations={realisations}
          setDisplayedRealisations={setDisplayedRealisations}
        />
        <div className='home__realisations__grid'>
          {displayedRealisations.map((realisation, i) => {
            return (
              <RealisationsItem
                key={i}
                setShowRealisation={setShowRealisation}
                setRealisations={setRealisations}
                realisation={realisation}
              />
            )
          })}
        </div>
      </section>
    </>
  )
}
