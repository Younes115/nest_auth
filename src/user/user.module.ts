import { Module } from '@nestjs/common';
import { userController } from './controller/user.controller.js';
import { userService } from './service/user.service.js';
import { User } from './entities/user.entitie.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [userController],
    providers: [userService],
    imports: [TypeOrmModule.forFeature([User])],
})
export class UserModule {
}
