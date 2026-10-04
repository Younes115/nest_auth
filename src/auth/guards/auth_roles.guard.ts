import {
    Injectable,
    CanActivate, 
    ExecutionContext,
    UnauthorizedException, 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';
import { CURRENT_USER_KEY } from '../../utails/constaint.js';
import { JWTPayloadType } from '../../utails/types.js';
import { Reflector } from '@nestjs/core';
import { UserService } from '../../user/service/user.service.js';

@Injectable()
export class AuthRolesGuard implements CanActivate {

    constructor(
       private readonly jwtService: JwtService,
       private readonly configService: ConfigService,
       private readonly reflector: Reflector,
       private readonly userService: UserService
    ) {}

 async canActivate(context: ExecutionContext):  Promise<boolean> {
    const roles = this.reflector.getAllAndOverride('roles',
        [context.getHandler(), context.getClass()]);
        if(!roles || roles.length === 0) return false;


    const request : Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') || [];
    if(token && type === 'Bearer'){
        try{
            
            const payload : JWTPayloadType = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET'),
            })
           
            const user = await this.userService.getCurrentUser(payload.id);
            if(roles.includes(user.userRole)){
                request[CURRENT_USER_KEY] = payload;
                return true;
            }
        }catch (error) {
            throw new UnauthorizedException('Invalid or expired token');

        }
    }else{
        throw new UnauthorizedException('Authorization header missing or malformed');
    }

    return false;

}   
}