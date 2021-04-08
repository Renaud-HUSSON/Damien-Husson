import Link from 'next/link'
import { MouseEventHandler, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useInView } from 'react-intersection-observer'
import { SectionsRefs } from '..'

interface HeaderProps {
  sectionsRefs: SectionsRefs
}

type sections =
  | 'presentation'
  | 'references'
  | 'competences'
  | 'realisations'
  | 'contact'

export const Header = ({ sectionsRefs }: HeaderProps) => {
  const router = useRouter()
  const [navOpened, setNavOpened] = useState(false)

  const options = {
    threshold: 0,
  }

  const { ref, inView } = useInView(options)

  const handleClick = () => {
    setNavOpened((nav) => !nav)

    if (navOpened) {
      document.body.removeAttribute('disable-scroll')
    } else {
      document.body.setAttribute('disable-scroll', 'true')
    }
  }

  useEffect(() => {
    document.body.removeAttribute('disable-scroll')
    setNavOpened(false)
  }, [router])

  const handleImgClick = () => {
    window.scrollTo({ top: 0 })
  }

  const handleSectionScrollTo: MouseEventHandler<HTMLLIElement> = (e) => {
    if (!(e.target instanceof HTMLLIElement)) return

    // @ts-ignore: Unreachable code error
    const section: sections = e.target.dataset.section!

    sectionsRefs[section].current.scrollIntoView()

    setNavOpened(false)
  }

  return (
    <div className='header__wrapper' ref={ref}>
      <header className={!inView ? 'header--sticky' : ''}>
        <img onClick={handleImgClick} src='/assets/logo.png' alt='Logo' />
        <ul className={navOpened ? 'opened' : ''}>
          <li data-section='presentation' onClick={handleSectionScrollTo}>
            PRÉSENTATION
          </li>
          <li data-section='references' onClick={handleSectionScrollTo}>
            RÉFÉRENCES
          </li>
          <li data-section='competences' onClick={handleSectionScrollTo}>
            COMPÉTENCES
          </li>
          <li data-section='realisations' onClick={handleSectionScrollTo}>
            RÉALISATIONS
          </li>
          <li data-section='contact' onClick={handleSectionScrollTo}>
            CONTACT
          </li>
        </ul>
        <div className={navOpened ? 'opened' : ''} onClick={handleClick}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </header>
    </div>
  )
}
