import { Dispatch, MouseEventHandler, SetStateAction, useRef } from 'react'
import { Realisation, ShowRealisation } from '../../..'
import { LikeButton } from '../LikeButton'
import { Share } from '../Share'

interface RealisationProps {
  setShowRealisation: Dispatch<SetStateAction<ShowRealisation>>
  setRealisations: Dispatch<SetStateAction<Realisation[]>>
  realisation: Realisation
}

export const RealisationsItem = ({
  setShowRealisation,
  setRealisations,
  realisation,
}: RealisationProps) => {

  const handleMouseMove: MouseEventHandler<HTMLDivElement> = (e) => {
    const element = e.target

    if (!(element instanceof HTMLDivElement)) return

    if (!element.dataset.animation) return

    const x = (element.offsetLeft + element.offsetWidth / 2 - e.pageX) / 15
    const y = (element.offsetTop + element.offsetHeight / 2 - e.pageY) / 15

    element.style.transform = `perspective(1500px) rotateY(${-x}deg) rotateX(${y}deg)`
  }

  const handleMouseLeave: MouseEventHandler<HTMLDivElement> = (e) => {
    const element = e.target

    if (!(element instanceof HTMLDivElement)) return

    element.style.transitionDuration = '0.3s, 0.7s'
    element.style.transitionProperty = 'transform, padding'
    element.style.transform = 'rotateY(0deg) rotateX(0deg)'
  }

  const handleMouseEnter: MouseEventHandler<HTMLDivElement> = (e) => {
    const element = e.target

    if (!(element instanceof HTMLDivElement)) return

    element.style.transitionDuration = '0s, 0.7s'
    element.style.transitionProperty = 'transform, padding'
  }

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {

    if (!(target instanceof HTMLDivElement)) return
    if (!target.dataset.id) return

    setShowRealisation({
      active: true,
      realisationId: parseInt(target.dataset.id),
    })
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className='home__realisations__grid__item'
      key={realisation.id}
      data-id={realisation.id}
      data-animation
      onClick={handleClick}
    >
      <div className='home__realisations__grid__item__hover'>
        <h3>{realisation.titre}</h3>
        <LikeButton
          setRealisations={setRealisations}
          realisation={realisation}
          color='#fff'
        />
        <Share realisationId={realisation.id} color='#fff' />
      </div>
      <div className='home__realisations__grid__item__img'>
        <img src={realisation.image} alt={realisation.titre} />
      </div>
    </div>
  )
}
