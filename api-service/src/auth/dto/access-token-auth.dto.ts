import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from 'class-validator';

export class AccessTokenAuthDto {
    @ApiProperty({
        example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMDE4IiwidXNlcm5hbWUiOiJtYWlsZEBtYWlsLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNjk3MDc1NzMxLCJleHAiOjE2OTcwNzU3OTF9.sc7Xy6F9xt-qeyMelVwXcrl8lx27eG559rBa31zLRY8",
        maximum: 255,
        description: "JWT access token",
        required: true
    })
    @IsNotEmpty()
    @IsString()
    access_token: string

}
