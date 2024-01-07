import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
    constructor(
        private readonly mailerService: MailerService,
        private readonly config: ConfigService
    ){ }

    async sendMail({data, templateName, subject, emailLists}) {
        console.log(this.config.get<string>('MAIL_FROM'))
        return await this.mailerService.sendMail({
            from: this.config.get<string>('MAIL_FROM'),
            to: emailLists,
            template: templateName,
            subject: subject,
            context: data
        }).then(res => console.log(res)).catch(e => console.log(e))
    }
}
