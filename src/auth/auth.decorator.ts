import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Role } from './../user/role.enum';

export function Auth(roles: Role[]): MethodDecorator {
    return applyDecorators(
        SetMetadata('roles', roles),
    );
}
