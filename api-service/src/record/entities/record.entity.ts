
// SELECT TOP (1000) [Id]
//       ,[OperationId]
//       ,[UserId]
//       ,[Amount]
//       ,[UserBalance]
//       ,[OperationResponse]
//       ,[CreatedOn]
//   FROM [challenge].[Challenge].[Records]

import { Exclude } from "@nestjs/class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { Operation } from "src/operation/entities/operation.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Index('PK_Record', ['id'], { unique: true })
@Entity('Records', { schema: 'Challenge' })
export class Record {
    @ApiProperty({
        example: 1,
    })
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'Id' })
    id?: string;

    @Column("bigint", { name: "OperationId" })
    operationId: string;

    @ManyToOne(() => Operation, (operation) => operation.records)
    
    @JoinColumn([{ name: 'OperationId', referencedColumnName: 'id' }])
    operation: Operation;

    @Column("bigint", { name: "UserId" })
    userId: string;

    @Column('int', { name: 'Amount' })  
    amount: number;

    @Column('int', { name: 'UserBalance' })  
    userBalance: number;

    @Column('nvarchar', { name: 'OperationResponse' })
    operationResponse: string;

    @Exclude({ toPlainOnly: true })
    @Column('datetime2', { name: 'CreatedOn', default: () => 'getdate()', select: false })
    createdOn?: Date;

}

