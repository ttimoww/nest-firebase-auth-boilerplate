import { applyDecorators, SetMetadata } from '@nestjs/common';

export function Auth(roles: string[]): MethodDecorator {
    return applyDecorators(
        SetMetadata('roles', roles),
        // For Swagger settings, see fr-backend
    );
}
