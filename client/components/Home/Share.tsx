import { MouseEvent, MouseEventHandler, useState } from 'react'
import { createPortal } from 'react-dom'
import { toast } from 'react-toastify'

interface ShareProps {
  realisationId: number
  color?: string
}

export const Share = ({ realisationId, color = '#000' }: ShareProps) => {
  const [shareOpened, setShareOpened] = useState(false)

  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    document.body.setAttribute('modalopened', 'true')
    e.stopPropagation()
    setShareOpened(true)
  }

  const closeModal: MouseEventHandler<HTMLDivElement> &
    MouseEventHandler<SVGSVGElement> = (
    e: MouseEvent<HTMLDivElement & SVGSVGElement>
  ) => {
    e.stopPropagation()
    document.body.removeAttribute('modalopened')
    setShareOpened(false)
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(
      `https://damienhusson.fr/?realisationId=${realisationId}`
    )
    toast.info('Le lien a été copié')
  }

  return (
    <div className='share' onClick={handleClick}>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='22.459'
        height='19.088'
        viewBox='0 0 22.459 19.088'
      >
        <path
          id='Icon_ionic-ios-share-alt'
          data-name='Icon ionic-ios-share-alt'
          d='M24.774,13.907,17.26,6.878a.384.384,0,0,0-.3-.128c-.234.011-.533.176-.533.426V10.7a.228.228,0,0,1-.192.218C8.766,12.065,5.619,17.656,4.506,23.461c-.043.229.266.442.41.261C7.642,20.287,10.96,18.045,16.205,18a.264.264,0,0,1,.224.256v3.461A.457.457,0,0,0,17.2,22l7.567-7.152a.588.588,0,0,0,.186-.447A.714.714,0,0,0,24.774,13.907Z'
          transform='translate(-3.496 -5.749)'
          fill='none'
          stroke={color}
          strokeWidth='1'
        />
      </svg>

      {shareOpened ? (
        createPortal(
          <div className='share__modal' onClick={closeModal}>
            <div
              className='share__modal__content'
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type='text'
                disabled
                defaultValue={`https://damienhusson.fr/?realisationId=${realisationId}`}
              />
              <div
                className='share__modal__content__copylink'
                onClick={handleCopyLink}
              >
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                >
                  <path d='M7 16h10v1h-10v-1zm0-1h10v-1h-10v1zm15-13v22h-20v-22h3c1.229 0 2.18-1.084 3-2h8c.82.916 1.771 2 3 2h3zm-11 1c0 .552.448 1 1 1s1-.448 1-1-.448-1-1-1-1 .448-1 1zm9 1h-4l-2 2h-3.898l-2.102-2h-4v18h16v-18zm-13 9h10v-1h-10v1zm0-2h10v-1h-10v1z' />
                </svg>
              </div>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='26.233'
                height='26.226'
                viewBox='0 0 26.233 26.226'
                className='share__modal__close'
                onClick={closeModal}
              >
                <path
                  id='Icon_ionic-ios-close'
                  data-name='Icon ionic-ios-close'
                  d='M27.51,24.4l9.369-9.369a2.2,2.2,0,0,0-3.1-3.1L24.405,21.3l-9.369-9.369a2.2,2.2,0,1,0-3.1,3.1L21.3,24.4l-9.369,9.369a2.2,2.2,0,0,0,3.1,3.1l9.369-9.369,9.369,9.369a2.2,2.2,0,0,0,3.1-3.1Z'
                  transform='translate(-11.285 -11.289)'
                ></path>
              </svg>
            </div>
          </div>,
          document.body
        )
      ) : (
        <></>
      )}
    </div>
  )
}
