import { Exclude } from "@nestjs/class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { RoleEnum } from "../users.enum";

export class FindUserDto {
    @ApiProperty({
        example: "mail@mail.com",
        maximum: 255,
        description: "User email",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    email: string


    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    password: string

}
