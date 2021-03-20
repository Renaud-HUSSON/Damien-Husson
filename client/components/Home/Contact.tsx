import { FormEvent, useEffect } from 'react'
import { Socials } from './Socials'

export const Contact = () => {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
  }

  return (
    <footer>
      <div className='home__contact'>
        <div id='contact'></div>
        <h2>Contactez-moi !</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input type='text' name='prenom' placeholder='Prénom' />
              <input type='text' name='nom' placeholder='Nom' />
            </div>
            <input type='email' name='email' placeholder='E-mail' />
            <textarea name='message' placeholder='Message' rows={10}></textarea>
            <button type='submit'>Envoyer</button>
          </form>
          <div>
            <p>Damien Husson - Etudiant</p>
            <a href='mailto:damienhusson09@gmail.com'>
              damienhusson09@gmail.com
            </a>
            <a href='mailto:damien.husson@etud.univ-tln.fr'>
              damien.husson@etud.univ-tln.fr
            </a>
            <p>06 78 91 55 78</p>
            <div>
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
