import { Controller, Post , Body,HttpCode, HttpStatus} from '@nestjs/common';
import { AuthService } from '../service/auth.service.js';
import { CreateUserDto } from '../../user/dtos/create_user_dtos.js';
import { LoginDto } from '../dtos/login.dto.js';

@Controller('api/auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService
    ) {}
    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async registerUser(@Body() createUserDto: CreateUserDto) {
        return this.authService.registerUser(createUserDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        const user = await this.authService.validateUser(loginDto);
        return this.authService.login(user);
    }
}
