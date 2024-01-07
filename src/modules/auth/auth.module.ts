import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/authRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/models/users.entity';
import { Addresses } from 'src/models/address.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { CryptoService } from 'src/commons/cripto.service';
import { GooogleAuthenticatorService } from 'src/commons/google-authenticator';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from '../mailer/mailer.service';
import { EmailModule } from '../mailer/mailer.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    TypeOrmModule.forFeature([Users, Addresses]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          global: true,
          secret: config.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRED')
          }
        }
      },
      inject: [ConfigService]
    }),
    EmailModule,
    ConfigModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, AuthRepository, CryptoService, GooogleAuthenticatorService]
})
export class AuthModule {}


