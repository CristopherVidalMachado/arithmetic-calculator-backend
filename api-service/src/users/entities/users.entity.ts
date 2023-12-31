import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { createCipheriv, randomBytes, randomInt, scrypt, scryptSync } from 'crypto';

import * as generator from 'generate-password'
import { Exclude } from '@nestjs/class-transformer';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';
import { RoleEnum } from '../users.enum';



@Index('PK_User', ['id'], { unique: true })
@Entity('Users', { schema: 'Challenge' })
export class User {
    @ApiProperty({
        example: 1,
    })
    @PrimaryGeneratedColumn({ type: 'bigint', name: 'Id' })
    id?: string;

    @ApiProperty({
        example: 'test@email.com',
    })
    @Column('nvarchar', { name: 'Email' })
    email: string;

    @ApiProperty({
        example: 'mypass123!',
    })
    @Column('nvarchar', { name: 'Password' })
    @Exclude()
    password?: string;

    @ApiProperty({
        example: true,
    })
    @Column('bit', { name: 'IsActive', default: () => '(1)' })
    
    active?: boolean

    @ApiProperty({
        example: 'user',
    })
    @Column('nvarchar', { name: 'Role' })
    role?: string;

    @Exclude({ toPlainOnly: true })
    @Column('datetime2', { name: 'CreatedOn', default: () => 'getdate()', select: false })
    createdOn?: Date;

    public static encryptPassword(user: User) {
        const saltRounds = 10;
        const salt = genSaltSync(saltRounds);
        const hash = hashSync(user.password, salt);
        user.password = hash;
        return user;
    }

    public static transformObject(user: User) {
        delete user.password;
        return user;
    }

  
}
