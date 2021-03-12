import Link from 'next/link'
import { useState } from 'react'

export const Header = () => {
  const [navOpened, setNavOpened] = useState(false)

  const handleClick = () => {
    setNavOpened((nav) => !nav)
  }

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
