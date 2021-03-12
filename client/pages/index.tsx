import { GetStaticProps } from 'next'
import { Competence, Realisation } from '..'
import { Header } from '../components/Header'
import { Banner } from '../components/Home/Banner'
import { Competences } from '../components/Home/Competences'
import { Contact } from '../components/Home/Contact'
import { Presentation } from '../components/Home/Presentation'
import { Realisations } from '../components/Home/Realisations'
import { Socials } from '../components/Home/Socials'

interface HomeProps {
  competences: Competence[]
  realisations: Realisation[]
}

export default function Home({ competences, realisations }: HomeProps) {
  return (
    <div className='home'>
      <img src='/assets/banner.png' alt='Banner' />
      <Header />
      <aside className='socials'>
        <Socials />
      </aside>
      <Banner />
      <Presentation />
      <Competences competences={competences} />
      <Realisations realisations={realisations} />
      <Contact />
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const realisations = await fetch(
    `${process.env.API_URL}realisations`
  ).then((res) => res.json())
  const competences = await fetch(
    `${process.env.API_URL}competences`
  ).then((res) => res.json())

  return {
    props: {
      competences: competences.data,
      realisations: realisations.data,
    },
    revalidate: 1,
  }
}
