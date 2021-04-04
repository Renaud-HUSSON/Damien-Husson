import nodemailer from 'nodemailer'

interface sendmailData {
  prenom: string
  nom: string
  email: string
  message: string
}

export const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST || 'smtp.gmail.com',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: process.env.MAIL_USER, // generated ethereal user
    pass: process.env.MAIL_PASSWORD, // generated ethereal password
  },
})

export const sendMail = async (data: sendmailData, subject: string) => {
  return transporter.sendMail({
    from: '"Renaud HUSSON" <renaudhusson09@gmail.com>',
    to: 'damienhusson09@gmail.com',
    subject,
    text: data.message,
    html: `<h1>Nouveau message de <strong>${data.prenom} ${data.nom}</strong> bonhomme ! </h1></br>
  <p>Nom: ${data.nom}</p>
  <p>Prenom: ${data.prenom}</p>
  <p>Email: ${data.email}</p>
  <pre><p>Message: ${data.message}</p></pre>
  `,
  })
}
