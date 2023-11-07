import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateRecordDto {
    @ApiProperty({
        example: "1000",
    })

    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)

    operationId: string;
    @ApiProperty({
        example: "1000",
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(1)
    @MaxLength(255)


    userId: string;
    @ApiProperty({
        example: 1000,
    })
    @IsNumber()
    amount: number;
    @ApiProperty({
        example: 100,
    })
    @IsNumber()
    userBalance: number;
    @ApiProperty({
        example: "0",
    })
    @IsString( )
    operationResponse: string;
    
}
