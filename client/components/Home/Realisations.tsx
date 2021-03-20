import Link from 'next/link'
import { Dispatch, MouseEventHandler, SetStateAction } from 'react'
import { Categorie, Realisation, ShowRealisation } from '../..'
import { FilterRealisations } from './FilterRealisations'

interface RealisationsProps {
  realisations: Realisation[]
  categories: Categorie[]
  displayedRealisations: Realisation[]
  setDisplayedRealisations: Dispatch<SetStateAction<Realisation[]>>
  setShowRealisation: Dispatch<SetStateAction<ShowRealisation>>
}

export const Realisations = ({
  realisations,
  categories,
  displayedRealisations,
  setDisplayedRealisations,
  setShowRealisation,
}: RealisationsProps) => {
  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const element = e.target

    if (!(element instanceof HTMLDivElement)) {
      return
    }

    const x = (element.offsetLeft + element.offsetWidth / 2 - e.pageX) / 15
    const y = (element.offsetTop + element.offsetHeight / 2 - e.pageY) / 15

    element.style.transform = `perspective(1500px) rotateY(${-x}deg) rotateX(${y}deg)`
  }

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    const element = e.target

    if (!(element instanceof HTMLDivElement)) {
      return
    }

    element.style.transition = '0.3s'
    element.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    const element = e.target

    if (!(element instanceof HTMLDivElement)) {
      return
    }

    element.style.transition = '0s'
  }

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    const target = e.target

    if (!(target instanceof HTMLDivElement)) return
    if (!target.dataset.id) return

    setShowRealisation({
      active: true,
      realisationId: parseInt(target.dataset.id),
    })
  }

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
              <div
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                onMouseEnter={handleMouseEnter}
                className='home__realisations__grid__item'
                key={realisation.id}
                data-id={realisation.id}
                onClick={handleClick}
              >
                <div>
                  <h3>{realisation.titre}</h3>
                </div>
                <img src={realisation.image} alt={realisation.titre} />
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
