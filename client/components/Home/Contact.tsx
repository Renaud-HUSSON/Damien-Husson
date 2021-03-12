import { Socials } from './Socials'

export const Contact = () => {
  return (
    <footer>
      <div className='home__contact'>
        <h2>Contactez-moi !</h2>
        <div>
          <form>
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
            <p>damienhusson09@gmail.com</p>
            <p>damien.husson@etud.univ-tln.fr</p>
            <p>06 78 91 02 75</p>
            <div>
              <Socials />
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
