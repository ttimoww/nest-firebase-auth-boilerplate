import { applyDecorators, SetMetadata } from '@nestjs/common';
import { Role } from './../user/role.enum';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth(roles: Role[]): MethodDecorator {
    return applyDecorators(
        SetMetadata('roles', roles),
        ApiBearerAuth(),
        ApiUnauthorizedResponse({ description: 'Unauthorized' }),
    );
}
