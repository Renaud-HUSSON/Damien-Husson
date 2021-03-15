import Link from 'next/link'
import { Dispatch, SetStateAction } from 'react'
import { Categorie, Realisation } from '../..'
import { FilterRealisations } from './FilterRealisations'

interface RealisationsProps {
  realisations: Realisation[]
  categories: Categorie[]
  displayedRealisations: Realisation[]
  setDisplayedRealisations: Dispatch<SetStateAction<Realisation[]>>
}

export const Realisations = ({
  realisations,
  categories,
  displayedRealisations,
  setDisplayedRealisations,
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
          {displayedRealisations.map((realisation) => {
            return (
              <div
                className='home__realisations__grid__item'
                key={realisation.id}
              >
                <div>
                  <h3>{realisation.titre}</h3>
                </div>
                <Link href={`/realisations/${realisation.id}`}>
                  <img src={realisation.image} alt={realisation.titre} />
                </Link>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
