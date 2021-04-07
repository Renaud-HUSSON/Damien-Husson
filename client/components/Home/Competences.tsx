import { LegacyRef, RefObject } from 'react'
import { useInView } from 'react-intersection-observer'
import { Competence } from '../..'

interface CompetencesProps {
  competences: Competence[]
  competencesRef: LegacyRef<HTMLDivElement>
}

export const Competences = ({
  competences,
  competencesRef,
}: CompetencesProps) => {
  const options = {
    triggerOnce: true,
    threshold: 0.4,
  }

  const { ref, inView } = useInView(options)

  return (
    <>
      <div id='competences' ref={competencesRef}></div>
      <section className='home__competences' ref={ref}>
        <div ref={ref} className={`${inView && 'home__competences__visible'}`}>
          <h2>Mes Compétences</h2>
          <div className='home__competences__grid'>
            {competences.map((competence) => {
              return (
                <div key={competence.id}>
                  <img src={competence.image} alt={competence.titre} />
                  <h3>{competence.titre}</h3>
                  <p>{competence.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
