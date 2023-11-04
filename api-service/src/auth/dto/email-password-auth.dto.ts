import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class EmailPasswordAuthDto {
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
        example: "0egpxP-f0z4)y=o",
        maximum: 100,
        description: "User password",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)
    password: string

}
