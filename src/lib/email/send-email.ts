import transporter from "./mailer";

/**
 * @function resetEmail
 * 
 * @param email - string
 * @param token - string
 */

export async function resetEmail(email:string, token:string) {
  const resetLink = `${process.env.NEXT_PUBLIC_HOSTNAME!}/auth/new-password?token=${token}`

  const mailOptions = {
    from: '"Calihub" <your-email@gmail.com>', // Sender address
    to: email, // List of recipients
    subject: 'Password Reset', // Subject line
    html: `<b>Reset here: <a href="${resetLink}">Link<a/></b>`,
  };
    
    // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log('Error occurred:', error);
    }
    console.log('Email sent: %s', info.messageId);
  });
}