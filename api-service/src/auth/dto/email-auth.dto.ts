import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class EmailAuthDto {
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
  
}
