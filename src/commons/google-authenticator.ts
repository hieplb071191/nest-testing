import { Injectable, OnModuleInit } from "@nestjs/common";
import { authenticator } from "otplib";
import * as qrcode from 'qrcode'

@Injectable()
export class GooogleAuthenticatorService implements OnModuleInit {
    private serviceName;

    constructor(

    ){
        this.serviceName = process.env.SERVICE_NAME
    }
    onModuleInit() {
        console.log(this.serviceName)
    }

    async generateUniqueSecret() {
        return await authenticator.generateSecret()
    }

    generateOTPToken(username, secret) {
        return authenticator.keyuri(username, this.serviceName, secret)
    }

    verifyOTPToken (token, secret) {
        return authenticator.verify({ token, secret })
    }

    async generateQrCode(otpAuth) {
        try {
            const QRCodeImageUrl = await qrcode.toDataURL(otpAuth)
            return QRCodeImageUrl
        } catch(e) {
            console.log(e)
        }
        
    }
}