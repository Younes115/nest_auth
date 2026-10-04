import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../../utails/userTypes.js';
export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);