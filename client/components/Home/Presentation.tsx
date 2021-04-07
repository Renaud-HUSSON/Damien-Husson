import { LegacyRef } from 'react'
import { useInView } from 'react-intersection-observer'

interface PresentationProps {
  presentationRef: LegacyRef<HTMLDivElement>
}

export const Presentation = ({ presentationRef }: PresentationProps) => {
  const options = {
    triggerOnce: true,
    threshold: 0,
  }

  const { ref, inView } = useInView(options)

  return (
    <>
      <div id='presentation' ref={presentationRef}></div>
      <section className='home__presentation'>
        <div ref={ref} className={`${inView && 'home__presentation__visible'}`}>
          <h2>Présentation</h2>
          <div>
            <p>
              Je m'appelle Damien, j'ai 18 ans, je suis originaire de Auch dans
              le Gers mais je fais mes études à Toulon. Je suis actuellement en
              DUT MMI mais j'aimerais me réorienter vers un DN MADE mention
              graphisme à Toulouse.{' '}
            </p>
            <p>
              Grâce à cette première année d'étude supérieure, j'ai appris
              beaucoup de chose mais j'ai surtout découvert une passion, le
              graphisme.{' '}
            </p>
            <p>
              Aujourd'hui je me définis comme quelqu'un de créatif, autonome et
              curieux. J'adore découvrir de nouvelle choses, c'est pour ça que
              je me forme par moi même dans différents domaines en dehors des
              études
            </p>
            <p>
              Vous découvrirez sur mon portfolio toutes mes créations que ce
              soit des dessins vectoriels, des photomontages, du web design ou
              encore des illustrations
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
