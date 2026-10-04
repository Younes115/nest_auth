import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { CURRENT_USER_KEY } from '../../utails/constaint.js';
import { JWTPayloadType } from '../../utails/types.js';

export const CurrentUser = createParamDecorator((data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user :JWTPayloadType = request[CURRENT_USER_KEY];
    return user;
}
);