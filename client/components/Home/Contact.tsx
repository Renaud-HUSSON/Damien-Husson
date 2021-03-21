import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  InputHTMLAttributes,
  useState,
} from 'react'
import { Socials } from './Socials'
import { toast } from 'react-toastify'

interface ContactData {
  prenom: string
  nom: string
  email: string
  message: string
}

export const Contact = () => {
  const [contactData, setContactData] = useState<ContactData>({
    prenom: '',
    nom: '',
    email: '',
    message: '',
  })

  const handleChange: ChangeEventHandler<HTMLInputElement> &
    ChangeEventHandler<HTMLTextAreaElement> = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData((data) => ({
      ...data,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!(e.target instanceof HTMLFormElement)) return

    e.preventDefault()

    if (Object.values(contactData).some((data) => data === '')) {
      return toast.error('Vous devez rempir tous les champs')
    }

    const response = await fetch('/api/contact', {
      method: 'POST',
      body: JSON.stringify(contactData),
      headers: new Headers({ 'Content-Type': 'application/json' }),
    }).then((res) => res.json())

    if (!response.success) {
      return toast.error("Une erreur est survenue lors de l'envoi du message")
    }

    toast.success('Merci pour votre message !')
    e.target.reset()
  }

  return (
    <footer>
      <div className='home__contact'>
        <div id='contact'></div>
        <h2>Contactez-moi !</h2>
        <div>
          <form onSubmit={handleSubmit}>
            <div>
              <input
                onChange={handleChange}
                type='text'
                name='prenom'
                placeholder='Prénom'
              />
              <input
                onChange={handleChange}
                type='text'
                name='nom'
                placeholder='Nom'
              />
            </div>
            <input
              onChange={handleChange}
              type='email'
              name='email'
              placeholder='E-mail'
            />
            <textarea
              onChange={handleChange}
              name='message'
              placeholder='Message'
              rows={10}
            ></textarea>
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
