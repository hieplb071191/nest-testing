import { BadRequestException, Injectable } from '@nestjs/common';
import { AuthRepository } from './repositories/authRepository';
import { SignupWithPasswordDto } from './dto/signup-with-password.dto';
import { CryptoService } from '../../commons/cripto.service';
import { GooogleAuthenticatorService } from '../../commons/google-authenticator';
import { SignInWithPasswordDto } from './dto/signin-with-password.dto';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { EmailService } from '../mailer/mailer.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly repository: AuthRepository,
        private readonly crypto: CryptoService,
        private readonly googleAuthenService: GooogleAuthenticatorService,
        private readonly jwtService: JwtService,
        private readonly config: ConfigService,
        private readonly mailerService: EmailService,
    ){}

    async signUpWithPassword(dto: SignupWithPasswordDto) {
        const {username, email, password, address, isEnable2FA, } = dto
        const oldUser = await this.repository.findUserByEmail(email, username)
        if (oldUser) {
            throw new BadRequestException('email or username was existed')
        }

        const encryptText = await this.crypto.hashPasswordCrypto(password)
        const twoFaSecret = await this.googleAuthenService.generateUniqueSecret()
        
        const model = {
            ...dto,
            password: encryptText,
            twoFaSecret,
            confirm: false
        }
        const user =  await this.repository.createUser(model)
        const addressModel = {
            ...address,
            userId: user.id
        }
        await this.repository.createAddress(addressModel)
        const otpToken = await this.googleAuthenService.generateOTPToken(user.email, user.twoFaSecret)
        const qrCode = await this.googleAuthenService.generateQrCode(otpToken)
        const authToken = await this.jwtService.signAsync(user) 
        const url = `${this.config.get('BASE_URL')}/verify?token=${authToken}`
        await this.mailerService.sendMail({data: {url, qrCode}, templateName: 'hello.template.handlebars', subject: 'confirm account signup',emailLists: [email]})
        return {
            qrCode,
            access_token: authToken
        }
    }

    async signInWithPassword(dto: SignInWithPasswordDto) {

    }

    async validateUser(user) {
        
    }
}
