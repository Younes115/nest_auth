import { Controller, Get, Post, Param, Delete, Body, Patch, Res, HttpStatus, HttpCode, Req, UseGuards } from '@nestjs/common';
import { UserService } from '../service/user.service.js';
import { AuthGuard } from '../../auth/guards/auth.guard.js';
import { CurrentUser } from '../decorators/current_user.decorator.js';
import type{ JWTPayloadType } from '../../utails/types.js';
import { Roles } from '../decorators/user_role.decorator.js';
import { UserRole } from '../../utails/userTypes.js';
import { AuthRolesGuard } from '../../auth/guards/auth_roles.guard.js';


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
  @Roles(UserRole.ADMIN)
  @UseGuards(AuthRolesGuard)
  @HttpCode(HttpStatus.OK)
  async findAllUsers() {
    const users = await this.userService.findAllUsers();
    return users;
  }

  @Get("current_user")
  @UseGuards(AuthGuard)
  async getCurrentUser(@CurrentUser() payload: JWTPayloadType) {
    return this.userService.getCurrentUser(payload.id);

  }

}