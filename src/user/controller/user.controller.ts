import { Controller, Get, Post, Param, Delete, Body, Patch, Res, HttpStatus, } from '@nestjs/common';
import { userService } from '../service/user.service.js';
import { createUserDto } from '../dtos/create_uset_dtos.js';
import type { Response } from 'express';
import { updateUserDto } from '../dtos/update_user_dto.js';
@Controller()
export class userController {
    constructor(private readonly userService: userService) {}
  @Get('users')
  getUsers(@Res() res:Response) {
    res.status(HttpStatus.OK).json(this.userService.getUsers());
  }

  @Get('user/:id')
  getUserById(@Param('id') id: string, @Res() res:Response): any {
    res.status(HttpStatus.OK).json(this.userService.getUserById(parseInt(id)));
  }

  @Post('user')
  addUser(@Res() res:Response, @Body() createUserDto: createUserDto): void {
    this.userService.addUser({ ...createUserDto });
    res.status(HttpStatus.CREATED).json({ message: 'User added successfully' });
  }

  @Patch('user/:id')
  updateUser(@Res() res:Response, @Param('id') id: string, @Body() updateUserDto: updateUserDto): void {
    this.userService.updateUser(parseInt(id), { ...updateUserDto });
    res.status(HttpStatus.OK).json({ message: 'User updated successfully' });
  }

  @Delete('user/:id')
  deleteUser(@Res() res:Response, @Param('id') id: string): void {
    this.userService.deleteUser(parseInt(id));
    res.status(HttpStatus.OK).json({ message: 'User deleted successfully' });
  }
}