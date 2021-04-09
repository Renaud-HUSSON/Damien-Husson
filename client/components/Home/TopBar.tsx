import {
  Dispatch,
  MouseEventHandler,
  RefObject,
  SetStateAction,
  useState,
} from 'react'
import { Realisation, ShowRealisation } from '../..'
import { LikeButton } from './LikeButton'
import { Share } from './Share'

interface TopBarProps {
  realisation: Realisation
  setShowRealisation: Dispatch<SetStateAction<ShowRealisation>>
  setRealisations: Dispatch<SetStateAction<Realisation[]>>
  modalRef: RefObject<HTMLDivElement>
}

export const TopBar = ({
  realisation,
  setShowRealisation,
  setRealisations,
  modalRef,
}: TopBarProps) => {
  const handleClose: MouseEventHandler<HTMLDivElement> = () => {
    setShowRealisation({
      active: false,
      realisationId: undefined,
    })
  }

  return (
    <div className='home__realisation__modal__topbar'>
      <div className='home__realisation__modal__topbar__left'>
        <LikeButton
          realisation={realisation}
          setRealisations={setRealisations}
        />
        <Share realisationId={realisation.id} />
      </div>
      <div
        className='home__realisation__modal__topbar__right'
        onClick={handleClose}
      >
        <svg
          className='home__realisation__modal__topbar__exit'
          width='27'
          height='26'
          viewBox='0 0 27 26'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <line
            x1='1.62605'
            y1='0.812974'
            x2='25.5766'
            y2='24.7635'
            stroke='black'
            strokeWidth='2'
          />
          <line
            x1='25.7071'
            y1='0.707107'
            x2='1.75659'
            y2='24.6576'
            stroke='black'
            strokeWidth='2'
          />
        </svg>
      </div>
    </div>
  )
}
