import { Controller, Get, Post, Param, Delete, Body, Patch, Res, HttpStatus, HttpCode, } from '@nestjs/common';
import { UserService } from '../service/user.service.js';


@Controller('api/users')
export class userController {
    constructor(private readonly userService: UserService) {}

  @Get('email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(@Body ('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return user;
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAllUsers() {
    const users = await this.userService.findAllUsers();
    return users;
  }

}