import { Competence } from '../..'

interface CompetencesProps {
  competences: Competence[]
}

export const Competences = ({ competences }: CompetencesProps) => {
  return (
    <>
      <div id='competences'></div>
      <section className='home__competences'>
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
      </section>
    </>
  )
}