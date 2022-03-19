import nodemailer, { Transporter } from 'nodemailer';
import config from 'config';
import log from '../logging/logger';

type MailData = {
  from: string;
  to: string;
  html: string;
  name: string;
  subject: string;
};

export default class NodemailerModule {
  private transporter: Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      logger: true,
      secure: false,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
      ignoreTLS: true,
    });
  }

  async send(mailData: MailData) {
    return this.transporter.sendMail(mailData, (err, data) => {
      if (err) log.error(err);
      else log.info(`Email sent successfully ${data}`);
    });
  }
}
