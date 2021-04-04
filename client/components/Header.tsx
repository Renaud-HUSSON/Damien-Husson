import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

export const Header = () => {
  const router = useRouter()
  const [navOpened, setNavOpened] = useState(false)

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

  return (
    <header>
      <Link href='/'>
        <a>
          <img src='/assets/logo.png' alt='Logo' />
        </a>
      </Link>
      <ul className={navOpened ? 'opened' : ''}>
        <Link href='#presentation'>
          <a>
            <li>PRÉSENTATION</li>
          </a>
        </Link>
        <Link href='#references'>
          <a>
            <li>RÉFÉRENCES</li>
          </a>
        </Link>
        <Link href='#competences'>
          <a>
            <li>COMPÉTENCES</li>
          </a>
        </Link>
        <Link href='#realisations'>
          <a>
            <li>RÉALISATIONS</li>
          </a>
        </Link>
        <Link href='#contact'>
          <a>
            <li>CONTACT</li>
          </a>
        </Link>
      </ul>
      <div onClick={handleClick}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </header>
  )
}
