import { Module } from '@nestjs/common';
import { userController } from './controller/user.controller.js';
import { UserService } from './service/user.service.js';
import { User } from './entities/user.entitie.js';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    controllers: [userController],
    providers: [UserService],
    imports: [TypeOrmModule.forFeature([User])],
    exports: [UserService],
})
export class UserModule {
}
