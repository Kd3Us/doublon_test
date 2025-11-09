import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
});

interface ConfirmationEmailData {
  to: string;
  userName: string;
  eventTitle: string;
  eventDate: Date;
  eventTime: string;
  eventLocation: string;
}

export async function sendConfirmationEmail(data: ConfirmationEmailData) {
  const { to, userName, eventTitle, eventDate, eventTime, eventLocation } = data;
  
  const formattedDate = eventDate.toLocaleDateString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmation d'inscription - Magn'Hetic</title>
    </head>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: #000; font-size: 28px; margin: 0;">MAGN'HETIC</h1>
        <p style="color: #666; margin: 5px 0 0 0;">Association Étudiante</p>
      </div>
      
      <div style="background: #f8f9fa; padding: 30px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #000; margin-top: 0;">Confirmation d'inscription</h2>
        <p>Bonjour ${userName},</p>
        <p>Votre inscription à l'événement <strong>${eventTitle}</strong> a été confirmée avec succès !</p>
        
        <div style="background: white; padding: 20px; border-radius: 6px; margin: 20px 0;">
          <h3 style="margin-top: 0; color: #000;">Détails de l'événement :</h3>
          <p><strong>Date :</strong> ${formattedDate}</p>
          <p><strong>Horaire :</strong> ${eventTime}</p>
          <p><strong>Lieu :</strong> ${eventLocation}</p>
        </div>
        
        <p>Nous avons hâte de vous voir lors de cet événement !</p>
        <p>En cas de question, n'hésitez pas à nous contacter à <a href="mailto:contact@magnhetic.com">contact@magnhetic.com</a></p>
      </div>
      
      <div style="text-align: center; color: #666; font-size: 14px;">
        <p>Magn'Hetic - Association Étudiante HETIC</p>
        <p>27 Bis Rue du Progrès, 93100 Montreuil</p>
      </div>
    </body>
    </html>
  `;

  const textContent = `
    Confirmation d'inscription - Magn'Hetic
    
    Bonjour ${userName},
    
    Votre inscription à l'événement "${eventTitle}" a été confirmée avec succès !
    
    Détails de l'événement :
    Date : ${formattedDate}
    Horaire : ${eventTime}
    Lieu : ${eventLocation}
    
    Nous avons hâte de vous voir lors de cet événement !
    
    En cas de question, n'hésitez pas à nous contacter à contact@magnhetic.com
    
    Magn'Hetic - Association Étudiante HETIC
    27 Bis Rue du Progrès, 93100 Montreuil
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Confirmation d'inscription - ${eventTitle}`,
    text: textContent,
    html: htmlContent,
  });
}

interface ContactEmailData {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  subject: string;
  message: string;
}

export async function sendContactNotification(data: ContactEmailData) {
  const htmlContent = `
    <h2>Nouveau message de contact - Magn'Hetic</h2>
    <p><strong>Nom :</strong> ${data.firstName} ${data.lastName}</p>
    <p><strong>Email :</strong> ${data.email}</p>
    ${data.company ? `<p><strong>Entreprise :</strong> ${data.company}</p>` : ''}
    <p><strong>Sujet :</strong> ${data.subject}</p>
    <p><strong>Message :</strong></p>
    <p style="background: #f5f5f5; padding: 15px; border-radius: 5px;">${data.message}</p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `Nouveau contact - ${data.subject}`,
    html: htmlContent,
  });
}