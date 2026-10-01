import { IsEmail, IsNotEmpty, IsString, MinLength, IsEnum, IsOptional } from "class-validator";
import { UserRole } from "../entities/user.entitie.js";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail({},{ message: 'Please provide a valid email address' })
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6, { message: 'Password must be at least 6 characters long' })
    password: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsOptional()
    @IsEnum(UserRole, { message: 'Invalid role. Allowed values are: admin, user, guest' })
    role?: string;


}