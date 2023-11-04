import { Exclude } from "@nestjs/class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { RoleEnum } from "../users.enum";

export class CreateUserDto {
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

}
