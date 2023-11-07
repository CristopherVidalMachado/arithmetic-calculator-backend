
import { Exclude } from "@nestjs/class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Operation } from "src/operation/entities/operation.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Index('PK_Balance', ['id'], { unique: true })
@Entity('Balances', { schema: 'Challenge' })
export class Balance {
    @ApiProperty({
        example: 1,
    })
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'Id' })
    id?: string;


    @Column("bigint", { name: "UserId" })
    userId: string;

    @Column('int', { name: 'Amount' })
    amount: number;
    

    @Exclude({ toPlainOnly: true })
    @Column('datetime2', { name: 'CreatedOn', default: () => 'getdate()', select: false })
    createdOn?: Date;

}

