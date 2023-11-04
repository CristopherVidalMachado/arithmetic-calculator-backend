import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { RoleEnum } from "src/users/users.enum";

export class EmailPasswordDto {
    @ApiProperty({
        example: "user@mail.com",
        maximum: 255,
        description: "User email",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @MinLength(1)
    @MaxLength(255)
    email: string


    @IsOptional()
    @IsNotEmpty()
    @IsString()
    @IsEnum(RoleEnum)
    @MinLength(1)
    @MaxLength(255)
    role?: string


    @ApiProperty({
        example: "Password123_!",
        maximum: 255,
        description: "User email",
        required: true
    })
    @IsNotEmpty()
    @IsStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minSymbols: 1,
        minNumbers: 1,
    })
    password: string

}
