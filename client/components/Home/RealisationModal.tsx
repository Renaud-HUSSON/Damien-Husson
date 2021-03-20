import { useRouter } from 'next/router'
import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useRef,
} from 'react'
import { Realisation, ShowRealisation } from '../..'
import { TopBar } from './TopBar'

interface RealisationModalProps {
  displayedRealisations: Realisation[]
  showRealisation: ShowRealisation
  setShowRealisation: Dispatch<SetStateAction<ShowRealisation>>
  setRealisations: Dispatch<SetStateAction<Realisation[]>>
}

export const RealisationModal = ({
  displayedRealisations,
  showRealisation,
  setShowRealisation,
  setRealisations,
}: RealisationModalProps) => {
  const router = useRouter()
  const modalRef = useRef<HTMLDivElement>(null)

  const index = displayedRealisations.findIndex(
    (realisation) => realisation.id === showRealisation.realisationId
  )

  const realisation = displayedRealisations[index]

  const handlePrevious: MouseEventHandler<HTMLDivElement> = () => {
    setShowRealisation({
      active: true,
      realisationId:
        displayedRealisations[
          (index + displayedRealisations.length - 1) %
            displayedRealisations.length
        ].id,
    })
  }

  const handleNext: MouseEventHandler<HTMLDivElement> = () => {
    setShowRealisation({
      active: true,
      realisationId:
        displayedRealisations[(index + 1) % displayedRealisations.length].id,
    })
  }

  useEffect(() => {
    if (!router.query.realisationId) return

    const realisationId: number = parseInt(
      typeof router.query.realisationId === 'object'
        ? router.query.realisationId[0]
        : router.query.realisationId
    )

    displayedRealisations.some(
      (realisation: Realisation) => realisation.id === realisationId
    )
      ? setShowRealisation({
          active: true,
          realisationId: realisationId,
        })
      : setShowRealisation({
          active: false,
          realisationId: undefined,
        })
  }, [router])

  return (
    <div
      className={`home__realisation__modal ${
        showRealisation.active && 'home__realisation__modal--active'
      }`}
      ref={modalRef}
    >
      {showRealisation.realisationId ? (
        <>
          <TopBar
            setShowRealisation={setShowRealisation}
            realisation={realisation}
            setRealisations={setRealisations}
            modalRef={modalRef}
          />
          <div className='home__realisation__modal__content'>
            <div className='home__realisation__modal__content__image'>
              <div
                onClick={handlePrevious}
                className='home__realisation__modal__previous'
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  stroke='none'
                  width='15'
                  height='27'
                  viewBox='0 0 15 27'
                >
                  <g fillRule='evenodd'>
                    <path
                      fillRule='nonzero'
                      d='M14.258 1.53L13.198.47-.061 13.728l13.259 13.258 1.06-1.06L2.061 13.728z'
                    ></path>
                  </g>
                </svg>
              </div>
              <div className='home__realisation__modal__content__image__container'>
                <img src={realisation.image} alt={realisation.titre} />
              </div>
              <div
                onClick={handleNext}
                className='home__realisation__modal__next'
              >
                <svg
                  fill='currentColor'
                  stroke='none'
                  width='15'
                  height='27'
                  viewBox='0 0 15 27'
                >
                  <g fillRule='evenodd'>
                    <path
                      fillRule='nonzero'
                      d='M.198 25.926l1.06 1.06 13.259-13.258L1.258.47.198 1.53l12.197 12.198z'
                    ></path>
                  </g>
                </svg>
              </div>
            </div>
            <div className='home__realisation__modal__content__text'>
              <h4>{realisation.titre}</h4>
              <pre>
                <p>{realisation.description}</p>
              </pre>
              <a download href={realisation.image}>
                Télécharger
              </a>
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  )
}
