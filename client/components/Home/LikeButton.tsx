import {
  Dispatch,
  MouseEventHandler,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Realisation } from '../..'

interface LikeButtonInterface {
  realisation: Realisation
  setRealisations: Dispatch<SetStateAction<Realisation[]>>
  color?: string
}

export const LikeButton = ({
  realisation,
  setRealisations,
  color = '#000',
}: LikeButtonInterface) => {
  const [liked, setLiked] = useState(false)

  useEffect(() => {
    setLiked(
      window.localStorage.getItem(`realisation-like-${realisation.id}`) ===
        'true'
    )
  }, [])

  const handleClick: MouseEventHandler<SVGSVGElement> = (e) => {
    e.stopPropagation()
    const likeOrUnlike = liked ? 'unlike' : 'like'

    fetch(`/api/realisations/${likeOrUnlike}`, {
      method: 'POST',
      body: JSON.stringify({
        id: realisation.id,
      }),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    })

    localStorage.setItem(
      `realisation-like-${realisation.id}`,
      liked ? '' : 'true'
    )
    setLiked((like) => !like)

    setRealisations((realisations) => [
      ...realisations,
      {
        ...realisations.filter((rea) => rea.id === realisation.id)[0],
        likes: (realisation.likes += liked ? -1 : 1),
      },
    ])
  }

  useEffect(() => {
    setLiked(
      localStorage.getItem(`realisation-like-${realisation.id}`) === 'true'
    )
  }, [realisation])

  return (
    <div className='home__realisations__like'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='21.528'
        height='18.892'
        viewBox='0 0 21.528 18.892'
        onClick={handleClick}
      >
        <path
          id='Icon_ionic-ios-heart-empty'
          data-name='Icon ionic-ios-heart-empty'
          d='M18.376,3.938h-.049a5.784,5.784,0,0,0-4.688,2.313A5.784,5.784,0,0,0,8.951,3.938H8.9A5.32,5.32,0,0,0,3.375,8.965a10.171,10.171,0,0,0,2.359,5.9,39.972,39.972,0,0,0,7.905,6.865,39.972,39.972,0,0,0,7.905-6.865,10.171,10.171,0,0,0,2.359-5.9A5.32,5.32,0,0,0,18.376,3.938Zm2.053,10.2a36.366,36.366,0,0,1-6.79,6.033,36.416,36.416,0,0,1-6.79-6.037A9.016,9.016,0,0,1,4.757,8.965,3.585,3.585,0,0,1,5.971,6.3,4.4,4.4,0,0,1,8.912,5.188h.044a4.493,4.493,0,0,1,2.028.48,4.166,4.166,0,0,1,1.5,1.268,1.473,1.473,0,0,0,2.319,0,4.208,4.208,0,0,1,1.5-1.268,4.493,4.493,0,0,1,2.028-.48h.044A4.413,4.413,0,0,1,21.317,6.3a3.574,3.574,0,0,1,1.214,2.66A9.132,9.132,0,0,1,20.429,14.134Z'
          transform='translate(-2.875 -3.438)'
          stroke={liked ? '#e03939' : color}
          fill={liked ? '#e03939' : color}
          strokeWidth='0.5'
        />
      </svg>
      <p>{realisation.likes}</p>
    </div>
  )
}
