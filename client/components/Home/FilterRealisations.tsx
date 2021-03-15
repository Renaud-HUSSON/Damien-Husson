import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Categorie, Realisation } from '../..'

interface FilterRealisationsProps {
  categories: Categorie[]
  realisations: Realisation[]
  setDisplayedRealisations: Dispatch<SetStateAction<Realisation[]>>
}

export const FilterRealisations = ({
  categories,
  realisations,
  setDisplayedRealisations,
}: FilterRealisationsProps) => {
  const [currentCategorie, setCurrentCategorie] = useState<string | null>(null)

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (!(e.target instanceof HTMLDivElement)) {
      return
    }

    const { categorie } = e.target.dataset

    setCurrentCategorie((currentCategorie) =>
      currentCategorie === categorie ? null : categorie ?? null
    )
  }

  useEffect(() => {
    const filteredRealisations =
      currentCategorie === null
        ? realisations
        : realisations.filter((realisation) => {
            return realisation?.Category?.nom === currentCategorie
          })

    setDisplayedRealisations(filteredRealisations)
  }, [currentCategorie])

  return (
    <div className='home__realisations__filter'>
      {categories.map((categorie) => {
        return (
          <div
            className={currentCategorie === categorie.nom ? 'selected' : ''}
            data-categorie={categorie.nom}
            onClick={handleClick}
            key={categorie.id}
          >
            {categorie.nom}
          </div>
        )
      })}
    </div>
  )
}
