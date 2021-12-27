import { createTransport, getTestMessageUrl } from 'nodemailer';

const transport = createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

function makeANiceEmail(text: string): string {
  return `
    <div style="
      border: 1px solid black;
      padding: 20px;
      font-family: sans-serif;
      line-height: 2;
      font-size: 20px;
    ">
      <h2>Hello There!</h2>
      <p>${text}</p>
      <p>Cheers! Sick Fits</p>
    </div>
  `;
}

export interface Envelope {
  from: string;
  to?: string[] | null;
}
export interface MailResponse {
  accepted?: string[] | null;
  rejected?: null[] | null;
  response: string;
  envelope: Envelope;
  messageId: string;
}

export async function sendPasswordResetEmail(
  resetToken: string,
  to: string
): Promise<void> {
  const info = (await transport.sendMail({
    to,
    from: 'admin@admin.com',
    subject: 'Your password reset token',
    html: makeANiceEmail(`Your Password Reset Token is here

      <a target="_blank" href="${process.env.FRONTEND_URL}/reset/?token=${resetToken}"> Click Here to Reset
    `),
  })) as MailResponse;
  if (process.env.MAIL_USER.includes('ethereal.email')) {
    console.log(`💌 Message Sent! Preview at ${getTestMessageUrl(info)}`)
  }
}