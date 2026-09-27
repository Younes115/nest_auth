import { Controller, Get, Post, Param, Delete, Body, Patch  } from '@nestjs/common';
import { AppService } from './app.service.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers(): any[] {
    return this.appService.getUsers();
  }

  @Get('users/:id')
  getUserById(@Param('id') id: string): any {
    return this.appService.getUserById(parseInt(id));
  }

  @Post('users')
  addUser(@Body() body:{ id: string; name: string; email: string }): void {
    this.appService.addUser({ id: parseInt(body.id), name: body.name, email: body.email });
  }

  @Patch('users/:id')
  updateUser(@Param('id') id: string, @Body() body: { name?: string; email?: string }): void {
    this.appService.updateUser(parseInt(id), body);
  }

  @Delete('users/:id')
  deleteUser(@Param('id') id: string): void {
    this.appService.deleteUser(parseInt(id));
  }
}
