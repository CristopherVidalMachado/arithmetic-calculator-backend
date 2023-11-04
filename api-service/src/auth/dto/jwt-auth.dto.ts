import { ApiProperty } from "@nestjs/swagger";

export class JwtAuthDto {
    @ApiProperty({
        example: "1018",
        maximum: 255,
        description: "User ID",
        required: true
    })
    sub: string
    
    @ApiProperty({
        example: "mail@mail.com",
        maximum: 255,
        description: "User email",
        required: true
    })
    username: string
    @ApiProperty({
        example: "user",
        maximum: 255,
        description: "User role",
        required: true
    })
    role: string
    @ApiProperty({
        example: 1697077391,
        maximum: 255,
        description: "iat",
        required: true
    })
    iat: number
    @ApiProperty({
        example: 1697077391,
        maximum: 255,
        description: "iat",
        required: true
    })
    exp: number

}
