import { ApiProperty } from "@nestjs/swagger";
import { TypeEnum } from "../operation.enum";
import { IsEnum, IsNotEmpty, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class CreateOperationDto {
    
    @ApiProperty({
        example: "addition",
        maximum: 255,
        description: "Operation type",
        required: true,
        enum: TypeEnum
    })
    @IsNotEmpty()
    @IsString()
    @IsEnum(TypeEnum)
    @MinLength(1)
    @MaxLength(255)
    type: string;

    @ApiProperty({
        example: 10,
        description: "Operation cost",
        required: true,
    })
    @IsNumber()
    cost: number;
}
