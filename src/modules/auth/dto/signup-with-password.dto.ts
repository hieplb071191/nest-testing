import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class AddressDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'Bình minh - Thanh Oai - Hà Nội'
    })
    specifically: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 20.4234123
    })
    lat: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 105.4234123
    })
    long: number
}

export class SignupWithPasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        example: 'lehiep'
    })
    username: string;


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

    @IsBoolean()
    @IsOptional()
    @ApiProperty({
        type: Boolean,
        example: false
    })
    isEnable2FA: boolean;

    @Type(() => AddressDto)
    @IsOptional()
    @ApiProperty({
        type: AddressDto
    })
    address

    
}