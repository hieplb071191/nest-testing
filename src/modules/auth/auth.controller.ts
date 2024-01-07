import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupWithPasswordDto } from './dto/signup-with-password.dto';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { SignInWithPasswordDto } from './dto/signin-with-password.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly service: AuthService
    ){}
    @UseGuards(ThrottlerGuard)
    @ApiTags('auth')
    @ApiOperation({
        operationId: 'signup-user-password',
        summary: 'signup-user-password',
        description: 'signup user with password',
    })
    @Post('signup-with-password')
    signupUserWithPassword(@Body() dto: SignupWithPasswordDto) {
        return this.service.signUpWithPassword(dto)
    }

    @UseGuards(ThrottlerGuard)
    @ApiTags('auth')
    @ApiOperation({
        operationId: 'signin-user-password',
        summary: 'signin-user-password',
        description: 'signin user with password',
    })
    @Post('signin-with-password')
    signinWithPassword(@Body() dto: SignInWithPasswordDto) {
        return this.service.signInWithPassword(dto)
    }

}
