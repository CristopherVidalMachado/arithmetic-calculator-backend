import { Exclude } from "@nestjs/class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';
import { RoleEnum } from "../users.enum";

export class UpdateUserDto {

    id?: string

    @ApiProperty({
        example: "user",
        maximum: 255,
        description: "User role",
        required: true,
        enum: RoleEnum
    })
    @IsNotEmpty()
    @IsString()
    @IsEnum(RoleEnum)
    @MinLength(1)
    @MaxLength(255)
    role: string

    @ApiProperty({
        example: true,
    })
    @IsBoolean()
    active: boolean

    @ApiProperty({
        example: "Password123_!",
        maximum: 255,
        description: "User email",
        required: true
    })
    @IsOptional()
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
