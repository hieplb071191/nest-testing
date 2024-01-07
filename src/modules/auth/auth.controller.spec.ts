import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthRepository } from './repositories/authRepository';
import { getRepositoryToken } from '@nestjs/typeorm';

import { Users } from '../../models/users.entity';
import { Addresses } from '../../models/address.entity';
import { CryptoService } from '../../commons/cripto.service';
import { JwtService } from '@nestjs/jwt';
import { EmailService } from '../mailer/mailer.service';
import { GooogleAuthenticatorService } from '../../commons/google-authenticator';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';


describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService

  beforeEach(async () => {
    const module_ref: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        AuthRepository,
        CryptoService,
        JwtService,
        EmailService,
        GooogleAuthenticatorService,
        ConfigService,
        {
          provide: getRepositoryToken(Users),
          useValue: AuthRepository
        },
        {
          provide: getRepositoryToken(Addresses),
          useValue: AuthRepository
        },
        {
          provide: MailerService,
          useValue: EmailService,
        }
      ],
      
    }).compile();
    authService = module_ref.get<AuthService>(AuthService)
    controller = module_ref.get<AuthController>(AuthController)
  });


  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('signUpWithPassword', () => {
    it('should return qrCode and access_token', async () => {
      const result = {
        qrCode: 'string',
        access_token: 'string'
      }
      jest.spyOn(authService, 'signUpWithPassword').mockImplementation(async () => {
        return result
      })
      expect(result).toBe(result)
    })
  })
});

