import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create_uset_dtos.js';
export class updateUserDto extends PartialType(CreateUserDto) {}