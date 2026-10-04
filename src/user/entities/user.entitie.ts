import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import { CURRENT_TIMESTAMP, } from "../../utails/constaint.js";
import * as bcrypt from 'bcrypt';
export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
    GUEST = 'guest',
}

@Entity("users")
export class User{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({unique: true })
    email: string;

    @Column()   
    password: string;


    @Column({ type: 'enum', enum: UserRole , default: UserRole.USER })
    userRole: UserRole;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;
    @Column({ type: 'timestamp', default: () => CURRENT_TIMESTAMP })
    createdAt: Date;
    @Column({ type: 'timestamp', default: () => CURRENT_TIMESTAMP, onUpdate: CURRENT_TIMESTAMP })
    updatedAt: Date;

    @BeforeInsert()
    async hashPassword() {
        if(this.password){
            const salt= await bcrypt.genSalt(10);
            this.password= await bcrypt.hash(this.password, salt);
        }
    }

}