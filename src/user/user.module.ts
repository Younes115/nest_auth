import { Module } from '@nestjs/common';
import { userController } from './controller/user.controller.js';
import { userService } from './service/user.service.js';

@Module({
    controllers: [userController],
    providers: [userService],
})
export class UserModule {
}
