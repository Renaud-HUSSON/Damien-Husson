import Link from 'next/link'
import { Realisation } from '../..'

interface RealisationsProps {
  realisations: Realisation[]
}

export const Realisations = ({ realisations }: RealisationsProps) => {
  return (
    <>
      <div id='realisations'></div>
      <section className='home__realisations'>
        <h2>Mes Réalisations</h2>
        <div>
          {realisations.map((realisation) => {
            return (
              <div className='home__realisations__item' key={realisation.id}>
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
