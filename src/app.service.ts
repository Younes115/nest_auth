import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  readonly users = [{
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',},{
    id: 2,  
    name: 'Jane Smith',
    email: 'jane.smith@example.com',}
  ]
  getUsers(): any[] {
    return this.users;
  }

  getUserById(id: number): any {
    const user = this.users.find(user => user.id === id);
    if (!user) {
      throw new Error(`User with id ${id} not found.`);
    }
    return user;
  }

  addUser(user: { id: number; name: string; email: string }): any[] {
    this.users.push(user);
    return this.users;
  }

  updateUser(id: number, updatedUser: { name?: string; email?: string }): any[] {
    const user = this.getUserById(id);
    if (user) {
      user.name = updatedUser.name ?? user.name;
      user.email = updatedUser.email ?? user.email;
    }else {
      throw new Error(`User with id ${id} not found.`);
    }
    return this.users;
  }

  deleteUser(id: number): void {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
}
