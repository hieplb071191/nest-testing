import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class SignInWithPasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'good.boy.0991@gmail.com'
    })
    email: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: '12345678'
    })
    password: string;
}