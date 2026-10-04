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

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(
       private readonly jwtService: JwtService,
       private readonly configService: ConfigService,
    ) {}

 async canActivate(context: ExecutionContext):  Promise<boolean> {
    const request : Request = context.switchToHttp().getRequest();
    const [type, token] = request.headers.authorization?.split(' ') || [];
    if(token && type === 'Bearer'){
        try{
            
            const payload : JWTPayloadType = await this.jwtService.verifyAsync(token, {
                secret: this.configService.get<string>('JWT_SECRET'),
            })
            request[CURRENT_USER_KEY] = payload;
        }catch (error) {
            throw new UnauthorizedException('Invalid or expired token');

        }
    }else{
        throw new UnauthorizedException('Authorization header missing or malformed');
    }

    return true;

}   
}