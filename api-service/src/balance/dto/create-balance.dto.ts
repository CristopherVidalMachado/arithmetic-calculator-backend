import {ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateBalanceDto {
    @IsString()
    @ApiProperty({
        example: 1000,
        description: "User Id",
        required: true,
      
    })

    userId: string;
    @ApiProperty({
        example: 1000,
        description: "Amount",
        required: true,
    })
    @IsNumber()
    amount: number;
}
