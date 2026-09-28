import { PartialType } from '@nestjs/mapped-types';
import { createUserDto } from './create_uset_dtos.js';
export class updateUserDto extends PartialType(createUserDto) {}