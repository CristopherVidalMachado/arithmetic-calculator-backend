import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { RoleEnum } from "src/users/users.enum";

export class CreateAuthDto {
    @ApiProperty({
        example: "mail@mail.com",
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

    @ApiProperty({
        example: "user",
        maximum: 100,
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

}
