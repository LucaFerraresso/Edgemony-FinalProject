import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { data, eta, orario, email, numeroBiglietti } = await request.json();

  console.log('Email:', process.env.EMAIL); // Verifica se l'email è corretta
  console.log('Password:', process.env.PASSWORD); // Verifica se la password è corretta

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL, // Usa il tuo indirizzo Gmail
      pass: process.env.PASSWORD, // Usa la password per le app generata, senza spazi
    },
    secure: false, // Usa false per STARTTLS
    tls: {
      rejectUnauthorized: false, // Ignora certificati non validi, se necessario
    },
  });

  let mailOptions = {
  from: process.env.EMAIL,
  to: email,
  subject: 'Conferma Prenotazione',
  html: `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2 style="color: #4CAF50;">Conferma Prenotazione</h2>
      <p>La tua prenotazione è stata registrata con successo.</p>
      <p><strong>Data:</strong> ${data}</p>
      <p><strong>Età:</strong> ${eta}</p>
      <p><strong>Orario:</strong> ${orario}</p>
      <p><strong>Numero di Biglietti:</strong> ${numeroBiglietti}</p>
      <p>Verrai contattato per completare il pagamento.</p>
      <footer style="margin-top: 20px; color: #777;">
        <p>Grazie per aver prenotato con noi!</p>
      </footer>
    </div>
  `,
};

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email inviata con successo' });
  } catch (error) {
    console.error('Errore durante l\'invio dell\'email:', error);
    return NextResponse.json({ error: `Errore durante l'invio dell'email: ${error.message}` }, { status: 500 });
  }
}
