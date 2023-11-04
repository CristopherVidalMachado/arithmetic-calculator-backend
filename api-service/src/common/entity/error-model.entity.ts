import { ApiProperty } from "@nestjs/swagger";

export class ValidationErrorModel {
    @ApiProperty()
    statusCode: string

    @ApiProperty()
    error: string

    @ApiProperty()
    message?: string[] | string;
}

export class DefaultErrorModel {

    @ApiProperty()
    statusCode: string

    @ApiProperty()
    message?: string[] | string;
}