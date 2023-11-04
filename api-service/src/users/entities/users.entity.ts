import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { createCipheriv, randomBytes, randomInt, scrypt, scryptSync } from 'crypto';

import * as generator from 'generate-password'
import { Exclude } from '@nestjs/class-transformer';
import { compareSync, genSaltSync, hashSync } from 'bcrypt';



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
    password?: string;

    @ApiProperty({
        example: 'test@email.com',
    })
    @Column('nvarchar', { name: 'Role'  })
    role?: string;

    @Exclude({ toPlainOnly: true })
    @Column('datetime2', { name: 'CreatedOn', default: () => 'getdate()', select: false })
    createdOn?: Date;

 

    @Exclude()
    plainPassword?: string;

    public static generatePassword(user: User) {
        user.plainPassword = generator.generate({
            length: randomInt(8, 16),
            uppercase: true,
            lowercase: true,
            symbols: true,
            exclude: '"',
            excludeSimilarCharacters: true,
            numbers: true
        })
        user.password = this.encryptPassword(user).password;
        return user;
    }

    public static encryptPassword(user: User) {
        const saltRounds = 10;
        const salt = genSaltSync(saltRounds);
        const hash = hashSync(user.plainPassword, salt);
        user.password = hash;
        return user;
    }

  
}
