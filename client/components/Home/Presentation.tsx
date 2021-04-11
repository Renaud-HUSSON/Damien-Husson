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
              Je m'appelle Damien, j'ai 18 ans, je suis originaire d'Auch mais
              je fais mes études à Toulon. Je suis actuellement en DUT MMI mais
              j'aimerais me réorienter vers un DN MADE mention graphisme à
              Toulouse.
            </p>

            <p>
              Je suis quelqu'un de créatif, autonome et très curieux. J'adore
              découvrir de nouvelles choses et c'est pour ça que je me forme en
              autodidacte dans différents domaines en dehors des études. Je suis
              passionné par le graphisme depuis maintenant 8 mois et j'essaye
              d'en apprendre plus tous les jours dans ce domaine.
            </p>

            <p>
              J'ai une grosse préférence pour le numérique, que ce soit du
              travail typographique, de l'illustration, du photomontage ou du
              design d'interface. Je connais moins les techniques
              traditionnelles mais je m'y m'intéresse aussi, j'apprends
              d'ailleurs le dessin en ce moment.
            </p>

            <p>
              Vous retrouverez, après cette présentation de moi, mon univers
              personnel avec une sélection de mes références, mes compétences
              sur les différents logiciels que j'utilise, ainsi qu'une sélection
              de mes réalisations.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
