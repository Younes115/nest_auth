import { Controller, Get, Post, Param, Delete, Body, Patch, Res, HttpStatus, HttpCode, } from '@nestjs/common';
import { userService } from '../service/user.service.js';
import { CreateUserDto } from '../dtos/create_uset_dtos.js';
import type { Response } from 'express';
import { updateUserDto } from '../dtos/update_user_dto.js';
@Controller('api')
export class userController {
    constructor(private readonly userService: userService) {}
 @Post('users/register')
 @HttpCode(HttpStatus.CREATED)
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);
    return user;
  }
  @Get('users/email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(@Body ('email') email: string) {
    const user = await this.userService.findByEmail(email);
    return user;
  }

}