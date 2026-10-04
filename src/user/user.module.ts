import { Module } from '@nestjs/common';
import { userController } from './controller/user.controller.js';
import { UserService } from './service/user.service.js';
import { User } from './entities/user.entitie.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module.js';
import { forwardRef } from '@nestjs/common';

@Module({
    controllers: [userController],
    providers: [UserService],
    imports: [forwardRef(() => AuthModule),
        TypeOrmModule.forFeature([User])],
    exports: [UserService],
})
export class UserModule {
}
