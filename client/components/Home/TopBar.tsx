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
  const [fullScreen, setFullscreen] = useState(false)

  const handleFullScreen: MouseEventHandler<HTMLDivElement> = () => {
    if (!modalRef.current) return setFullscreen(false)

    if (fullScreen === true) {
      if (!document.fullscreenElement) return setFullscreen(false)

      document.exitFullscreen()
    } else {
      modalRef.current.requestFullscreen()
    }

    setFullscreen((fs) => !fs)
  }

  const handleClose: MouseEventHandler<HTMLDivElement> = () => {
    if (document.fullscreenElement) document.exitFullscreen()

    setShowRealisation({
      active: false,
      realisationId: undefined,
    })
  }

  return (
    <div className='home__realisation__modal__topbar'>
      <div className='home__realisation__modal__topbar__left'>
        <div
          onClick={handleFullScreen}
          className='home__realisation__modal__topbar__fullscreen'
        >
          {fullScreen ? (
            <svg
              width='28'
              height='28'
              viewBox='0 0 28 28'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M26.576 1.414L17.414 10.198'
                stroke='black'
                strokeWidth='1'
              />
              <path
                d='M25.121 10.198L17.414 10.198L17.414 3.246'
                stroke='black'
                strokeWidth='1'
              />
              <path
                d='M1.414 26.198L10.576 17.414'
                stroke='black'
                strokeWidth='1'
              />
              <path
                d='M2.869 17.414L10.576 17.414L10.576 24.366'
                stroke='black'
                strokeWidth='1'
              />
            </svg>
          ) : (
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='27.99'
              height='27.612'
              viewBox='0 0 27.99 27.612'
            >
              <g
                id='Icon_feather-arrow-up-right'
                data-name='Icon feather-arrow-up-right'
                transform='translate(6.285 -9.086)'
              >
                <path
                  id='Tracé_85'
                  data-name='Tracé 85'
                  d='M11.129,19.284,20.291,10.5'
                  fill='none'
                  stroke='#000'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1'
                />
                <path
                  id='Tracé_86'
                  data-name='Tracé 86'
                  d='M12.584,10.5h7.707v6.952'
                  fill='none'
                  stroke='#000'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1'
                />
              </g>
              <g
                id='Icon_feather-arrow-up-right-2'
                data-name='Icon feather-arrow-up-right'
                transform='translate(-9.715 6.914)'
              >
                <path
                  id='Tracé_85-2'
                  data-name='Tracé 85'
                  d='M20.291,10.5l-9.162,8.784'
                  fill='none'
                  stroke='#000'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1'
                />
                <path
                  id='Tracé_86-2'
                  data-name='Tracé 86'
                  d='M20.291,17.452H12.584V10.5'
                  transform='translate(-1.455 1.832)'
                  fill='none'
                  stroke='#000'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth='1'
                />
              </g>
            </svg>
          )}
        </div>
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
