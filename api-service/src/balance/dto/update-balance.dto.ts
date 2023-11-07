import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateBalanceDto } from './create-balance.dto';

export class UpdateBalanceDto extends PartialType(CreateBalanceDto) {

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
    amount: number;
}
