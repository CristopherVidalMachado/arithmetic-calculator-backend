import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

import { Exclude } from '@nestjs/class-transformer';

@Index('PK_Operation', ['id'], { unique: true })
@Entity('Operations', { schema: 'Challenge' })
export class Operation {
    @ApiProperty({
        example: 1,
    })
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'Id' })
    id?: string;

    @ApiProperty({
        example: 'addition',
    })
    @Column('nvarchar', { name: 'Type' })
    type: string;

    @ApiProperty({
        example: 'mypass123!',
    })
    @Column('int', { name: 'Cost' })
    cost: number;

    @Exclude({ toPlainOnly: true })
    @Column('datetime2', { name: 'CreatedOn', default: () => 'getdate()', select: false })
    createdOn?: Date;


  
}
