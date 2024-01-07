import { Injectable, OnModuleInit } from "@nestjs/common";
import { createCipheriv, createDecipheriv, randomBytes, scrypt, pbkdf2Sync } from 'crypto';
import { promisify } from 'util';

@Injectable()
export class CryptoService implements OnModuleInit {
    
    onModuleInit() {
        console.log('init crypto service')
        console.log(randomBytes(16).toString('hex'))
    }

    async encryptText(textToEncrypt:string) {
        const iv = randomBytes(16)
        const password = process.env.CYPHER_PASSWORD
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const cipher = createCipheriv('aes-256-ctr', key, iv);
        const cryptText = Buffer.concat([
            cipher.update(textToEncrypt),
            cipher.final(),
        ]);
        return cryptText
    }

    async decrypText(encryptedText) {
        const iv = randomBytes(16)
        const password = process.env.CYPHER_PASSWORD
        const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
        const decipher = createDecipheriv('aes-256-ctr', key, iv);
        const decryptedText = Buffer.concat([
            decipher.update(encryptedText),
            decipher.final(),
        ]);
        return decryptedText
    }

    async hashPasswordCrypto(password) {
        const salt = process.env.SALT
        const hashPassword = await pbkdf2Sync(password, salt, 100,64, 'sha512').toString('hex')
        return hashPassword
    }

    async comparePassword(password, hashPassword) {
        const hash = await this.hashPasswordCrypto(password)
        return hash === hashPassword
    }
}