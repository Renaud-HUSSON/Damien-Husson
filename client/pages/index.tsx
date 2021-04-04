import { GetStaticProps } from 'next'
import { useEffect, useState } from 'react'
import { Categorie, Competence, Realisation, ShowRealisation } from '..'
import { Header } from '../components/Header'
import { Banner } from '../components/Home/Banner'
import { Competences } from '../components/Home/Competences'
import { Contact } from '../components/Home/Contact'
import { Presentation } from '../components/Home/Presentation'
import { Realisations } from '../components/Home/Realisations'
import { Socials } from '../components/Home/Socials'
import { RealisationModal } from '../components/Home/RealisationModal'
import { NextSeo } from 'next-seo'
import { References } from '../components/Home/References'
import Particles from 'react-tsparticles'

interface HomeProps {
  competences: Competence[]
  realisationsData: Realisation[]
  categories: Categorie[]
}

export default function Home({
  competences,
  realisationsData,
  categories,
}: HomeProps) {
  const [realisations, setRealisations] = useState<Realisation[]>(
    realisationsData
  )

  const [displayedRealisations, setDisplayedRealisations] = useState<
    Realisation[]
  >(realisationsData)

  const [showRealisation, setShowRealisation] = useState<ShowRealisation>({
    active: false,
    realisationId: undefined,
  })

  useEffect(() => {
    if (showRealisation.active) {
      document.body.setAttribute('disable-scroll', 'true')
    } else {
      document.body.setAttribute('disable-scroll', 'false')
    }
  }, [showRealisation])

  return (
    <div className='home'>
      <NextSeo
        title='Damien HUSSON - Portfolio'
        description='Bonjour, je suis un étudiant passionné par le graphisme.
Bienvenue sur mon portfolio !'
        openGraph={{
          title: 'Damien HUSSON - Portfolio',
          description:
            'Bonjour, je suis un étudiant passionné par le graphisme. Bienvenue sur mon portfolio !',
          type: 'website',
          images: [
            {
              url: 'https://damienhusson.fr/assets/ogbanner.big.jpg',
              width: 1920,
              height: 1080,
              alt: 'Site de Damien HUSSON',
            },
            {
              url: 'https://damienhusson.fr/assets/ogbanner.jpg',
              width: 720,
              height: 405,
              alt: 'Site de Damien HUSSON',
            },
            {
              url: 'https://damienhusson.fr/assets/ogbanner.min.jpg',
              width: 300,
              height: 169,
              alt: 'Site de Damien HUSSON',
            },
          ],
          profile: {
            firstName: 'Damien',
            lastName: 'HUSSON',
          },
        }}
        twitter={{
          cardType: 'summary_large_image',
          handle: '@damien_hsn',
        }}
      />
      <img src='/assets/banner.png' alt='Banner' />
      <Particles
        style={{ position: 'absolute', top: '0', left: 0 }}
        width='100vw'
        options={{
          particles: {
            number: {
              value: 13,
              density: {
                enable: true,
              },
            },
            fpsLimit: 60,
            opacity: {
              value: 1,
              anim: {
                minimumValue: 1,
              },
            },
            size: {
              value: 5,
              random: true,
            },
            line_linked: {
              enable: false,
            },
            move: {
              enable: true,
              outMode: 'out',
              random: true,
              speed: 0.5,
              straight: false,
            },
            color: {
              value: ['#FF3E7A', '#FF8831', '#53O09A', '#68A4E8'],
            },
          },
        }}
      />
      <Header />
      <aside className='socials'>
        <Socials />
      </aside>
      <Banner />
      <Presentation />
      <References />
      <Competences competences={competences} />
      <Realisations
        realisations={realisations}
        categories={categories}
        setDisplayedRealisations={setDisplayedRealisations}
        displayedRealisations={displayedRealisations}
        setShowRealisation={setShowRealisation}
        setRealisations={setRealisations}
      />
      <RealisationModal
        displayedRealisations={displayedRealisations}
        showRealisation={showRealisation}
        setShowRealisation={setShowRealisation}
        setRealisations={setRealisations}
      />
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
  const categories = await fetch(
    `${process.env.API_URL}categories`
  ).then((res) => res.json())

  return {
    props: {
      competences: competences.data,
      realisationsData: realisations.data,
      categories: categories.data,
    },
    revalidate: 1,
  }
}
