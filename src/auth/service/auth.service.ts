import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../../user/service/user.service.js';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from "../../user/dtos/create_user_dtos.js";
import { LoginDto } from '../dtos/login.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}

    async registerUser(CreateUserDto: CreateUserDto) {
        const user = await this.userService.createUser(CreateUserDto);
        const payload = { email: user.email, id: user.id };
        const token = this.jwtService.sign(payload);
        return { user, token };
    }

    async validateUser(loginDto: LoginDto): Promise<any> {
        const user = await this.userService.findByEmail(loginDto.email);
        const isMatch = await bcrypt.compare(loginDto.password, user.password);
        if(!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const {password, ...result} = user;
        return result;
    }

    async login(user: any) {
        const payload = { email: user.email, id: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
