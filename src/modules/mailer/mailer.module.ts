import { Module } from '@nestjs/common';
import { EmailService } from './mailer.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          transport: {
            host: config.get<string>('SEND_GRID_HOST'),
            secure: false,
            auth: {
              user: config.get<string>('TWILIO_API_USER'),
              pass: config.get<string>('TWILIO_API_MAIL_KEY')
            }
          },
          template: {
            dir: join(process.cwd(), 'src/modules/mailer/templates'),
            adapter: new HandlebarsAdapter(),
            options: {
              strict: true
            }
          },
          options: {
            partials: {
              dir: join(process.cwd(), 'src/modules/mailer/templates/partials'),
              options: {
                stric: true
              }
            }
          }
        }
      },
      inject: [ConfigService]
    }),
  ],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
